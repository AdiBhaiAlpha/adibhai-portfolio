import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Send, Sparkles, FolderGit2, X } from 'lucide-react';

export const NotificationsDropdown: React.FC = () => {
  const {
    notifications,
    notificationsOpen,
    setNotificationsOpen,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    sendPushTestNotification,
    projects,
    setSelectedProject,
    setCurrentPage,
    showToast
  } = useApp();

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notificationsOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Check if click was on the toggle button
        const target = e.target as HTMLElement;
        if (target.closest('[title="Notifications"]') || target.closest('[aria-label="Notifications"]')) {
          return;
        }
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [notificationsOpen, setNotificationsOpen]);

  if (!notificationsOpen) return null;

  const handleNotificationClick = (id: string, projectId?: string) => {
    markNotificationAsRead(id);
    if (projectId) {
      const proj = projects.find(p => p.id === projectId);
      if (proj) {
        setSelectedProject(proj);
      } else {
        setCurrentPage('projects');
      }
      setNotificationsOpen(false);
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-x-3 top-[5.25rem] z-50 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] shadow-2xl sm:absolute sm:inset-x-auto sm:right-6 sm:top-[4.5rem] sm:w-[24rem] animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-3 bg-[var(--surface-soft)]">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#7130cf]" />
          <h2 className="font-display text-sm font-bold text-[var(--text)]">Notifications</h2>
          {unreadNotificationsCount > 0 && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              {unreadNotificationsCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadNotificationsCount > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsAsRead}
              className="text-xs font-bold text-[#7130cf] transition hover:opacity-80 dark:text-purple-300 cursor-pointer"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={() => setNotificationsOpen(false)}
            className="text-[var(--text-soft)] hover:text-[var(--text)] sm:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[22rem] overflow-y-auto overscroll-contain divide-y divide-[var(--line)]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--text-soft)]">
            No notifications right now.
          </div>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item.id, item.projectId)}
              className={`flex items-start gap-3 px-4 py-3.5 text-left transition hover:bg-[var(--surface-soft)] cursor-pointer ${
                !item.read ? 'bg-[#7130cf]/5 dark:bg-[#7130cf]/10' : ''
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#7130cf] dark:bg-purple-950/40 dark:text-purple-300">
                <FolderGit2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold leading-5 text-[var(--text)] line-clamp-1">
                    {item.title}
                  </span>
                  {!item.read && (
                    <span className="h-2 w-2 rounded-full bg-[#7130cf] shrink-0 mt-1" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[var(--text-soft)] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <span className="mt-1 block text-[10px] font-medium text-[var(--text-soft)]">
                  {item.timeAgo}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Push Notification Controls */}
      <div className="border-t border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--text-soft)]">
          Browser Notifications
        </p>
        <p className="mt-1 text-xs text-[var(--text-soft)]">
          Stay notified when new production systems or open-source tools release.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => showToast('Browser push notifications enabled!', 'success')}
            className="btn-primary !px-3 !py-1.5 !text-xs"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Enable alerts</span>
          </button>
          <button
            type="button"
            onClick={sendPushTestNotification}
            className="btn-secondary !px-3 !py-1.5 !text-xs"
          >
            <Send className="h-3 w-3" />
            <span>Send test</span>
          </button>
        </div>
      </div>
    </div>
  );
};
