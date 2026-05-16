import { useEffect, useState } from 'react';
import {
  CheckSquare2, AlertCircle, Megaphone, Users,
  Plus, StickyNote, ArrowRight, Clock,
  Circle, Loader2, CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/lib/constants';
import api from '@/lib/api';
import { cn } from '@/lib/cn';

// ── Helpers ────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 11) return 'Selamat pagi';
  if (h < 15) return 'Selamat siang';
  if (h < 18) return 'Selamat sore';
  return 'Selamat malam';
}

function formatDate(): string {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function relativeDate(iso: string | null): string {
  if (!iso) return '';
  const d    = new Date(iso);
  const now  = new Date();
  const diff = Math.ceil((d.getTime() - now.setHours(0,0,0,0)) / 86_400_000);
  if (diff < 0)  return `${Math.abs(diff)} hari lalu`;
  if (diff === 0) return 'Hari ini';
  if (diff === 1) return 'Besok';
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
}

function bulletinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
}

// ── Types ──────────────────────────────────────────────────
type TaskStatus   = 'TODO' | 'IN_PROGRESS' | 'DONE';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
type BulletinPriority = 'NORMAL' | 'IMPORTANT' | 'URGENT';

interface Task {
  id:       string;
  title:    string;
  status:   TaskStatus;
  priority: TaskPriority;
  dueDate:  string | null;
  assignee: { fullName: string } | null;
}

interface Bulletin {
  id:         string;
  title:      string;
  priority:   BulletinPriority;
  category:   string;
  publishedAt: string | null;
  isRead:     boolean;
}

// ── Priority colours (task left border) ───────────────────
const PRIORITY_BORDER: Record<TaskPriority, string> = {
  URGENT: 'border-l-danger',
  HIGH:   'border-l-warning',
  MEDIUM: 'border-l-info',
  LOW:    'border-l-gray-300',
};

const PRIORITY_DOT: Record<BulletinPriority, string> = {
  URGENT:    'bg-danger',
  IMPORTANT: 'bg-warning',
  NORMAL:    'bg-gray-300',
};

const STATUS_ICON: Record<TaskStatus, React.ElementType> = {
  TODO:        Circle,
  IN_PROGRESS: Clock,
  DONE:        CheckCircle2,
};

const STATUS_COLOR: Record<TaskStatus, string> = {
  TODO:        'text-gray-400',
  IN_PROGRESS: 'text-info',
  DONE:        'text-success',
};

// ── Main Component ─────────────────────────────────────────
export default function DashboardPage() {
  const user    = useAuthStore((s) => s.user);
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  // ── Stats state ────────────────────────────────────────
  const [taskStats, setTaskStats] = useState({ active: 0, overdue: 0, loading: true });
  const [unreadBulletins, setUnreadBulletins] = useState({ count: 0, loading: true });
  const [activeUsers, setActiveUsers] = useState({ count: 0, loading: isAdmin });

  // ── Widget data ────────────────────────────────────────
  const [recentTasks, setRecentTasks]       = useState<Task[]>([]);
  const [recentBulletins, setRecentBulletins] = useState<Bulletin[]>([]);
  const [widgetLoading, setWidgetLoading]   = useState(true);

  // Fetch tasks
  useEffect(() => {
    api.get('/tasks', { params: { limit: 100 } })
      .then((res) => {
        const all: Task[] = res.data.data ?? [];
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const active  = all.filter((t) => t.status !== 'DONE');
        const overdue = all.filter(
          (t) => t.status !== 'DONE' && t.dueDate && new Date(t.dueDate) < now,
        );

        setTaskStats({ active: active.length, overdue: overdue.length, loading: false });

        // Widget: up to 5 non-DONE tasks, ordered by closest due date first
        const sorted = [...active].sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        setRecentTasks(sorted.slice(0, 5));
      })
      .catch(() => setTaskStats({ active: 0, overdue: 0, loading: false }))
      .finally(() => setWidgetLoading(false));
  }, []);

  // Fetch bulletins
  useEffect(() => {
    api.get('/bulletins', { params: { limit: 100 } })
      .then((res) => {
        const all: Bulletin[] = res.data.data ?? [];
        const unread = all.filter((b) => !b.isRead).length;
        setUnreadBulletins({ count: unread, loading: false });
        setRecentBulletins(all.slice(0, 5));
      })
      .catch(() => setUnreadBulletins({ count: 0, loading: false }));
  }, []);

  // Fetch active users (admin only)
  useEffect(() => {
    if (!isAdmin) return;
    api.get('/users', { params: { isActive: 'true', limit: 1 } })
      .then((res) => setActiveUsers({ count: res.data.meta?.total ?? 0, loading: false }))
      .catch(() => setActiveUsers({ count: 0, loading: false }));
  }, [isAdmin]);

  // ── Stat card definitions ──────────────────────────────
  type StatDef = {
    label: string; value: number | string;
    icon: React.ElementType; iconColor: string; loading: boolean;
  };

  const stats: StatDef[] = [
    {
      label: 'TUGAS AKTIF',
      value: taskStats.active,
      icon: CheckSquare2,
      iconColor: 'text-info',
      loading: taskStats.loading,
    },
    {
      label: 'OVERDUE',
      value: taskStats.overdue,
      icon: AlertCircle,
      iconColor: taskStats.overdue > 0 ? 'text-danger' : 'text-gray-400',
      loading: taskStats.loading,
    },
    {
      label: 'BULLETIN BELUM DIBACA',
      value: unreadBulletins.count,
      icon: Megaphone,
      iconColor: unreadBulletins.count > 0 ? 'text-warning' : 'text-gray-400',
      loading: unreadBulletins.loading,
    },
    ...(isAdmin
      ? [{
          label: 'STAFF AKTIF',
          value: activeUsers.count,
          icon: Users,
          iconColor: 'text-success',
          loading: activeUsers.loading,
        } satisfies StatDef]
      : []),
  ];

  return (
    <div className="space-y-5">
      {/* ── Welcome ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {getGreeting()}, {user?.name?.split(' ')[0] ?? 'User'}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">{formatDate()}</p>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-navy-50 text-navy">
          {user?.role?.replace(/_/g, ' ')}
        </span>
      </div>

      {/* ── Stat Cards ── */}
      <div className={cn('grid gap-4', isAdmin ? 'grid-cols-4' : 'grid-cols-3')}>
        {stats.map((s) => <StatCardItem key={s.label} stat={s} />)}
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Tugas Saya — 2/3 width */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-800">Tugas Saya</h2>
            <Link to={ROUTES.TASKS} className="flex items-center gap-1 text-xs text-info hover:underline">
              Lihat semua <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex-1">
            {widgetLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 size={20} className="animate-spin text-gray-300" />
              </div>
            ) : recentTasks.length === 0 ? (
              <EmptyState
                icon={CheckSquare2}
                heading="Tidak ada tugas aktif"
                description="Semua tugas selesai, atau belum ada tugas yang diberikan."
                action={{ label: 'Buka Tasks', to: ROUTES.TASKS }}
              />
            ) : (
              <ul className="divide-y divide-gray-50">
                {recentTasks.map((task) => {
                  const StatusIcon = STATUS_ICON[task.status];
                  const now = new Date(); now.setHours(0, 0, 0, 0);
                  const isOverdue = task.dueDate && new Date(task.dueDate) < now && task.status !== 'DONE';

                  return (
                    <li
                      key={task.id}
                      className={cn(
                        'flex items-start gap-3 px-5 py-3.5 border-l-2',
                        PRIORITY_BORDER[task.priority],
                        'hover:bg-gray-50/50 transition-colors',
                      )}
                    >
                      <StatusIcon size={15} className={cn('mt-0.5 flex-shrink-0', STATUS_COLOR[task.status])} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {task.dueDate && (
                            <span className={cn('text-xs', isOverdue ? 'text-danger font-medium' : 'text-gray-400')}>
                              {isOverdue ? '⚠ ' : ''}{relativeDate(task.dueDate)}
                            </span>
                          )}
                          {task.assignee && (
                            <span className="text-xs text-gray-400">· {task.assignee.fullName}</span>
                          )}
                        </div>
                      </div>
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full flex-shrink-0',
                        task.status === 'IN_PROGRESS' ? 'bg-info/10 text-info' : 'bg-gray-100 text-gray-500',
                      )}>
                        {task.status === 'IN_PROGRESS' ? 'Berjalan' : 'Todo'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Right column — 1/3 width */}
        <div className="space-y-4">
          {/* Bulletin Terbaru */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
              <h2 className="text-md font-semibold text-gray-800">Bulletin Terbaru</h2>
              <Link to={ROUTES.BULLETIN} className="flex items-center gap-1 text-xs text-info hover:underline">
                Semua <ArrowRight size={12} />
              </Link>
            </div>
            <div>
              {unreadBulletins.loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={18} className="animate-spin text-gray-300" />
                </div>
              ) : recentBulletins.length === 0 ? (
                <EmptyState
                  icon={Megaphone}
                  heading="Belum ada bulletin"
                  description="Pengumuman terbaru akan tampil di sini."
                />
              ) : (
                <ul className="divide-y divide-gray-50">
                  {recentBulletins.map((b) => (
                    <li key={b.id} className="flex items-start gap-2.5 px-4 py-3 hover:bg-gray-50/50 transition-colors">
                      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', PRIORITY_DOT[b.priority])} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p className={cn('text-xs leading-snug truncate', !b.isRead ? 'font-semibold text-gray-800' : 'text-gray-600')}>
                            {b.title}
                          </p>
                          {!b.isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-info flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {b.publishedAt ? bulletinDate(b.publishedAt) : '—'}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-3.5 border-b border-gray-100">
              <h2 className="text-md font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-3 space-y-1">
              <QuickAction icon={Plus}       label="Tambah Task"    to={ROUTES.TASKS}   />
              <QuickAction icon={StickyNote} label="Tambah Note"    to={ROUTES.NOTES}   />
              <QuickAction icon={Megaphone}  label="Lihat Bulletin" to={ROUTES.BULLETIN} />
              {isAdmin && (
                <QuickAction icon={Users} label="Manage Users" to={ROUTES.ADMIN_USERS} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Overdue Callout (only when overdue > 0) ── */}
      {taskStats.overdue > 0 && (
        <div className="flex items-center gap-3 bg-danger/5 border border-danger/20 rounded-lg px-4 py-3">
          <AlertCircle size={16} className="text-danger flex-shrink-0" />
          <p className="text-sm text-danger font-medium flex-1">
            Kamu memiliki <strong>{taskStats.overdue}</strong> tugas yang melewati deadline.
          </p>
          <Link
            to={ROUTES.TASKS}
            className="text-xs text-danger border border-danger/30 rounded px-2 py-1 hover:bg-danger/10 transition-colors flex-shrink-0"
          >
            Lihat sekarang
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────
function StatCardItem({ stat }: {
  stat: { label: string; value: number | string; icon: React.ElementType; iconColor: string; loading: boolean };
}) {
  const Icon = stat.icon;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-gray-500 tracking-wider">{stat.label}</p>
        <Icon size={16} className={stat.iconColor} />
      </div>
      {stat.loading ? (
        <div className="h-7 w-10 rounded bg-gray-200 animate-pulse" />
      ) : (
        <p className="text-2xl font-semibold text-gray-800 leading-none">{stat.value}</p>
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, heading, description, action }: {
  icon: React.ElementType; heading: string; description: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
      <Icon size={28} className="text-gray-300 mb-2.5" />
      <p className="text-sm font-medium text-gray-600">{heading}</p>
      <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">{description}</p>
      {action && (
        <Link to={action.to} className="mt-3 text-xs text-info hover:underline flex items-center gap-1">
          {action.label} <ArrowRight size={11} />
        </Link>
      )}
    </div>
  );
}

function QuickAction({ icon: Icon, label, to }: {
  icon: React.ElementType; label: string; to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <Icon size={15} className="text-gray-400 flex-shrink-0" />
      {label}
    </Link>
  );
}
