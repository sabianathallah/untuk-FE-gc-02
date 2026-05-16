import { useEffect, useState, useRef, FormEvent } from 'react';
import {
  Plus, Search, Circle, CheckCircle2, Clock, AlertCircle,
  Loader2, Trash2, X, ChevronDown,
} from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/cn';
import { useClickOutside } from '@/hooks/useClickOutside';

// ── Types ──────────────────────────────────────────────────
type TaskStatus   = 'TODO' | 'IN_PROGRESS' | 'DONE';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
type TaskCategory = 'MY_DAY' | 'IMPORTANT' | 'PLANNED' | 'CUSTOM';

interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate?: string | null;
  completedAt?: string | null;
  createdAt: string;
  creator:  { id: string; fullName: string };
  assignee?: { id: string; fullName: string } | null;
  _count: { subTasks: number; attachments: number };
}

interface Meta {
  total: number; page: number; limit: number; totalPages: number;
}

// ── Constants ──────────────────────────────────────────────
const STATUS_TABS: { value: TaskStatus | 'ALL'; label: string }[] = [
  { value: 'ALL',         label: 'Semua'       },
  { value: 'TODO',        label: 'Todo'        },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE',        label: 'Selesai'     },
];

const PRIORITY_OPTS: { value: TaskPriority; label: string }[] = [
  { value: 'URGENT', label: 'Urgent' },
  { value: 'HIGH',   label: 'High'   },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW',    label: 'Low'    },
];

const CATEGORY_OPTS: { value: TaskCategory; label: string }[] = [
  { value: 'MY_DAY',   label: 'Hari Ini'  },
  { value: 'IMPORTANT', label: 'Penting'  },
  { value: 'PLANNED',  label: 'Terencana' },
  { value: 'CUSTOM',   label: 'Lainnya'   },
];

// ── Helpers ────────────────────────────────────────────────
function priorityBadge(p: TaskPriority) {
  const map: Record<TaskPriority, string> = {
    URGENT: 'bg-danger-light text-danger',
    HIGH:   'bg-warning-light text-warning',
    MEDIUM: 'bg-info-light text-info',
    LOW:    'bg-gray-100 text-gray-500',
  };
  const label: Record<TaskPriority, string> = {
    URGENT: 'Urgent', HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low',
  };
  return { cls: map[p], text: label[p] };
}

function priorityBorder(p: TaskPriority) {
  return {
    URGENT: 'border-l-danger',
    HIGH:   'border-l-warning',
    MEDIUM: 'border-l-info',
    LOW:    'border-l-gray-300',
  }[p];
}

function formatDue(date: string) {
  const d = new Date(date);
  const now = new Date();
  const isOverdue = d < now;
  const label = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  return { label, isOverdue };
}

// ── Main Page ──────────────────────────────────────────────
export default function TasksPage() {
  const user = useAuthStore((s) => s.user);

  const [tasks,   setTasks]   = useState<Task[]>([]);
  const [meta,    setMeta]    = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const [statusFilter,   setStatusFilter]   = useState<TaskStatus | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | ''>('');
  const [search,         setSearch]         = useState('');
  const [searchInput,    setSearchInput]    = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (statusFilter !== 'ALL') params.status   = statusFilter;
      if (priorityFilter)         params.priority = priorityFilter;
      if (search)                 params.search   = search;

      const res = await api.get('/tasks', { params });
      setTasks(res.data.data ?? []);
      setMeta(res.data.meta ?? null);
    } catch {
      setError('Gagal memuat task. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [statusFilter, priorityFilter, search]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleStatusToggle = async (task: Task) => {
    const next: TaskStatus =
      task.status === 'TODO' ? 'IN_PROGRESS'
      : task.status === 'IN_PROGRESS' ? 'DONE'
      : 'TODO';
    try {
      await api.patch(`/tasks/${task.id}`, { status: next });
      fetchTasks();
    } catch { /* silently fail */ }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus task ini?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch { /* silently fail */ }
  };

  return (
    <div className="space-y-4">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Tasks</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {meta ? `${meta.total} task ditemukan` : 'Kelola tugas harian Anda'}
          </p>
        </div>
        <button
          onClick={() => { setEditTask(null); setShowForm(true); }}
          className="flex items-center gap-1.5 h-9 px-4 bg-navy text-white text-sm font-medium rounded hover:bg-navy-light transition-colors"
        >
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status tabs */}
        <div className="flex items-center bg-gray-100 rounded p-0.5 gap-0.5">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                'px-3 h-7 text-sm rounded transition-colors',
                statusFilter === tab.value
                  ? 'bg-white text-gray-800 font-medium shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <PriorityFilter value={priorityFilter} onChange={setPriorityFilter} />

        {/* Search */}
        <div className="relative ml-auto">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari task..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-8 pl-8 pr-3 text-sm border border-gray-300 rounded bg-white placeholder:text-gray-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50 w-52"
          />
        </div>
      </div>

      {/* ── Task List ── */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <SkeletonList />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchTasks} />
        ) : tasks.length === 0 ? (
          <EmptyTasks onAdd={() => { setEditTask(null); setShowForm(true); }} />
        ) : (
          <ul className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                currentUserId={user?.id ?? ''}
                onStatusToggle={() => handleStatusToggle(task)}
                onEdit={() => { setEditTask(task); setShowForm(true); }}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </ul>
        )}
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <TaskFormModal
          task={editTask}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); fetchTasks(); }}
        />
      )}
    </div>
  );
}

// ── TaskRow ────────────────────────────────────────────────
function TaskRow({
  task, currentUserId, onStatusToggle, onEdit, onDelete,
}: {
  task: Task;
  currentUserId: string;
  onStatusToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { cls: pCls, text: pText } = priorityBadge(task.priority);
  const isDone = task.status === 'DONE';
  const isOwner = task.creator.id === currentUserId;

  return (
    <li
      className={cn(
        'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group border-l-2',
        priorityBorder(task.priority),
      )}
    >
      {/* Status toggle */}
      <button
        onClick={onStatusToggle}
        className="flex-shrink-0 text-gray-400 hover:text-navy transition-colors"
        title={isDone ? 'Tandai ulang' : 'Tandai selesai'}
      >
        {isDone ? (
          <CheckCircle2 size={18} className="text-success" />
        ) : task.status === 'IN_PROGRESS' ? (
          <Clock size={18} className="text-warning" />
        ) : (
          <Circle size={18} />
        )}
      </button>

      {/* Title + meta */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={onEdit}>
        <p className={cn('text-sm text-gray-800 truncate', isDone && 'line-through text-gray-400')}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {task.dueDate && (() => {
            const { label, isOverdue } = formatDue(task.dueDate!);
            return (
              <span className={cn('text-xs', isOverdue && !isDone ? 'text-danger' : 'text-gray-400')}>
                {isOverdue && !isDone && <AlertCircle size={10} className="inline mr-0.5" />}
                {label}
              </span>
            );
          })()}
          {task.assignee && (
            <span className="text-xs text-gray-400">→ {task.assignee.fullName}</span>
          )}
        </div>
      </div>

      {/* Priority badge */}
      <span className={cn('flex-shrink-0 text-[11px] font-medium px-2 py-0.5 rounded', pCls)}>
        {pText}
      </span>

      {/* Actions */}
      {isOwner && (
        <button
          onClick={onDelete}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-danger transition-all"
          title="Hapus task"
        >
          <Trash2 size={14} />
        </button>
      )}
    </li>
  );
}

// ── Priority Filter Dropdown ───────────────────────────────
function PriorityFilter({
  value, onChange,
}: {
  value: TaskPriority | '';
  onChange: (v: TaskPriority | '') => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const label = value ? PRIORITY_OPTS.find((o) => o.value === value)?.label : 'Priority';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'flex items-center gap-1.5 h-8 px-3 text-sm border rounded transition-colors',
          value
            ? 'border-navy text-navy bg-navy-50'
            : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50',
        )}
      >
        {label}
        {value ? (
          <X size={12} onClick={(e) => { e.stopPropagation(); onChange(''); }} />
        ) : (
          <ChevronDown size={12} />
        )}
      </button>
      {open && (
        <div className="absolute top-9 left-0 w-36 bg-white border border-gray-200 rounded shadow-md z-10 py-1">
          {PRIORITY_OPTS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                'w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors',
                value === opt.value ? 'text-navy font-medium' : 'text-gray-700',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Task Form Modal ────────────────────────────────────────
function TaskFormModal({
  task, onClose, onSaved,
}: {
  task: Task | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!task;
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const [title,    setTitle]    = useState(task?.title       ?? '');
  const [desc,     setDesc]     = useState(task?.description ?? '');
  const [status,   setStatus]   = useState<TaskStatus>(task?.status   ?? 'TODO');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'MEDIUM');
  const [category, setCategory] = useState<TaskCategory>(task?.category ?? 'MY_DAY');
  const [dueDate,  setDueDate]  = useState(
    task?.dueDate ? task.dueDate.slice(0, 10) : '',
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Judul wajib diisi'); return; }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        title: title.trim(),
        description: desc || null,
        status,
        priority,
        category,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      };

      if (isEdit) {
        await api.patch(`/tasks/${task.id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      onSaved();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Terjadi kesalahan';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-md font-semibold text-gray-800">
            {isEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <p className="text-xs text-danger bg-danger-light px-3 py-2 rounded border-l-2 border-danger">
              {error}
            </p>
          )}

          {/* Title */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Judul *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nama task..."
              className="w-full h-9 px-3 text-sm border border-gray-300 rounded bg-white placeholder:text-gray-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Detail task (opsional)..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white placeholder:text-gray-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50 resize-none"
            />
          </div>

          {/* Row: Status + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full h-9 px-3 text-sm border border-gray-300 rounded bg-white focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50"
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-9 px-3 text-sm border border-gray-300 rounded bg-white focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50"
              >
                {PRIORITY_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Row: Category + Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full h-9 px-3 text-sm border border-gray-300 rounded bg-white focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50"
              >
                {CATEGORY_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-9 px-3 text-sm border border-gray-300 rounded bg-white focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy-50"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-9 px-5 text-sm font-medium bg-navy text-white rounded hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {isEdit ? 'Simpan' : 'Buat Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Skeleton ───────────────────────────────────────────────
function SkeletonList() {
  return (
    <ul className="divide-y divide-gray-100">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="skeleton w-4 h-4 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-3.5 rounded w-2/3" />
            <div className="skeleton h-3 rounded w-1/3" />
          </div>
          <div className="skeleton h-5 w-14 rounded flex-shrink-0" />
        </li>
      ))}
    </ul>
  );
}

// ── Empty & Error ──────────────────────────────────────────
function EmptyTasks({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle2 size={40} className="text-gray-300 mb-3" />
      <p className="text-sm font-medium text-gray-600">Belum ada task</p>
      <p className="text-xs text-gray-400 mt-1">Buat task pertama Anda untuk mulai bekerja.</p>
      <button
        onClick={onAdd}
        className="mt-4 flex items-center gap-1.5 h-8 px-4 text-sm font-medium text-white bg-navy rounded hover:bg-navy-light transition-colors"
      >
        <Plus size={14} /> New Task
      </button>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle size={32} className="text-danger mb-3" />
      <p className="text-sm text-gray-600">{message}</p>
      <button onClick={onRetry} className="mt-3 text-sm text-info hover:underline">
        Coba lagi
      </button>
    </div>
  );
}
