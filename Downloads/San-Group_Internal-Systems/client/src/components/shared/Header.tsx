import { useRef, useState, useEffect, FormEvent } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu, Bell, ChevronDown, LogOut, KeyRound, ChevronRight,
  X, Loader2, AlertCircle, CheckCircle2, Clock, Megaphone,
  ShieldAlert, Info,
} from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/cn';
import api from '@/lib/api';

const BREADCRUMB_MAP: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/tasks':       'Tasks',
  '/bulletin':    'Bulletin',
  '/notes':       'Notes',
  '/database':    'DB Links',
  '/admin/users': 'Manage Users',
};

function useBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; to: string }[] = [];
  let path = '';
  for (const seg of segments) {
    path += `/${seg}`;
    const label = BREADCRUMB_MAP[path];
    if (label) crumbs.push({ label, to: path });
  }
  return crumbs;
}

// ── Notification type icon ─────────────────────────────────
function NotifIcon({ type }: { type: string }) {
  const cls = 'flex-shrink-0 mt-0.5';
  switch (type) {
    case 'TASK_ASSIGNED':
    case 'TASK_COMPLETED':
      return <CheckCircle2 size={14} className={cn(cls, 'text-info')} />;
    case 'BULLETIN_NEW':
      return <Megaphone size={14} className={cn(cls, 'text-warning')} />;
    case 'BULLETIN_URGENT':
      return <ShieldAlert size={14} className={cn(cls, 'text-danger')} />;
    default:
      return <Info size={14} className={cn(cls, 'text-gray-400')} />;
  }
}

function notifAge(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1)  return 'Baru saja';
  if (diff < 60) return `${diff} menit lalu`;
  const h = Math.floor(diff / 60);
  if (h < 24)   return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

// ── Change Password Modal ──────────────────────────────────
function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const logout   = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [form, setForm]     = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) { setForm({ oldPassword: '', newPassword: '', confirmPassword: '' }); setError(''); setSuccess(false); }
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) { setError('Konfirmasi password tidak cocok'); return; }
    setSaving(true); setError('');
    try {
      await api.patch('/auth/change-password', form);
      setSuccess(true);
      // Password changed → all refresh tokens invalidated. Log out after 2s.
      setTimeout(() => { logout(); navigate(ROUTES.LOGIN, { replace: true }); }, 2000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">Ganti Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
        </div>

        {success ? (
          <div className="px-5 py-8 flex flex-col items-center text-center gap-3">
            <CheckCircle2 size={32} className="text-success" />
            <p className="text-sm font-medium text-gray-800">Password berhasil diubah</p>
            <p className="text-xs text-gray-500">Anda akan diarahkan ke halaman login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password Lama <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                value={form.oldPassword}
                onChange={(e) => setForm((f) => ({ ...f, oldPassword: e.target.value }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                placeholder="Password saat ini"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password Baru <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                placeholder="Min. 8 karakter, 1 kapital, 1 angka"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Konfirmasi Password Baru <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                placeholder="Ulangi password baru"
              />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-xs text-danger">
                <AlertCircle size={12} /> {error}
              </p>
            )}

            <p className="text-xs text-gray-400">
              Setelah password diubah, Anda akan otomatis logout dari semua perangkat.
            </p>

            <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
              <button type="button" onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
                Batal
              </button>
              <button type="submit" disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-navy hover:bg-navy-light rounded disabled:opacity-50">
                {saving && <Loader2 size={13} className="animate-spin" />}
                Simpan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Main Header ────────────────────────────────────────────
export default function Header() {
  const toggle  = useUiStore((s) => s.toggleSidebar);
  const user    = useAuthStore((s) => s.user);
  const logout  = useAuthStore((s) => s.logout);
  const { notifications, unreadCount, loading: notifLoading, fetch: fetchNotifs, markRead, markAllRead } =
    useNotificationStore();
  const navigate = useNavigate();
  const crumbs   = useBreadcrumbs();

  const [userMenuOpen, setUserMenuOpen]     = useState(false);
  const [notifOpen, setNotifOpen]           = useState(false);
  const [changePwOpen, setChangePwOpen]     = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef    = useRef<HTMLDivElement>(null);

  useClickOutside(userMenuRef, () => setUserMenuOpen(false));
  useClickOutside(notifRef, () => setNotifOpen(false));

  // Fetch notifications on mount
  useEffect(() => { fetchNotifs(); }, [fetchNotifs]);

  const handleLogout = async () => {
    try { await api.post('/auth/logout'); } catch { /* ignore */ }
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  function openNotif() {
    setNotifOpen((prev) => !prev);
    setUserMenuOpen(false);
  }

  function openUserMenu() {
    setUserMenuOpen((prev) => !prev);
    setNotifOpen(false);
  }

  async function handleNotifClick(id: string) {
    await markRead(id);
  }

  return (
    <>
      <header className="flex-shrink-0 flex items-center justify-between h-header px-4 bg-white border-b border-gray-200 z-10">
        {/* Left: toggle + breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <nav className="flex items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
            <span className="text-gray-400">SAN Group</span>
            {crumbs.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                <ChevronRight size={14} className="text-gray-300" />
                {i === crumbs.length - 1 ? (
                  <span className="text-gray-700 font-medium">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to} className="hover:text-gray-700 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Right: notifications + user menu */}
        <div className="flex items-center gap-1">
          {/* Notification bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={openNotif}
              className="relative w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-500"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-semibold flex items-center justify-center leading-none">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">
                    Notifikasi
                    {unreadCount > 0 && (
                      <span className="ml-1.5 text-xs bg-danger text-white px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-info hover:underline">
                      Tandai semua dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notifLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 size={18} className="animate-spin text-gray-300" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="py-8 text-center">
                      <Bell size={24} className="text-gray-200 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Belum ada notifikasi</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => handleNotifClick(n.id)}
                        className={cn(
                          'w-full text-left flex items-start gap-2.5 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors',
                          !n.isRead && 'bg-info/5',
                        )}
                      >
                        <NotifIcon type={n.type} />
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-sm leading-tight', !n.isRead ? 'font-semibold text-gray-800' : 'text-gray-700')}>
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Clock size={10} /> {notifAge(n.createdAt)}
                          </p>
                        </div>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-info flex-shrink-0 mt-1" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div ref={userMenuRef} className="relative ml-1">
            <button
              onClick={openUserMenu}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                {user ? getInitials(user.name) : '?'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name ?? '—'}</p>
                <p className="text-xs text-gray-400 leading-tight">{user?.role?.replace(/_/g, ' ') ?? ''}</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 ml-1" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-11 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-50 py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
                </div>

                <button
                  onClick={() => { setUserMenuOpen(false); setChangePwOpen(true); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <KeyRound size={15} className="text-gray-400" />
                  Ganti Password
                </button>

                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <ChangePasswordModal open={changePwOpen} onClose={() => setChangePwOpen(false)} />
    </>
  );
}

function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
