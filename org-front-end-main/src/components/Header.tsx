import React, { useState } from 'react';
import { NavigationPath } from '../types';
import { AVATARS } from '../data/mockData';

interface HeaderProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  collapsed: boolean;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onOpenCommandPalette
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const getBreadcrumb = () => {
    switch (currentPath) {
      case 'brain':
        return { section: 'Workspace', title: 'Brain Overview' };
      case 'ask':
        return { section: 'Cognitive Mesh', title: 'Ask the Brain' };
      case 'knowledge':
        return { section: 'Memory Lake', title: 'Knowledge Explorer' };
      case 'projects':
        return { section: 'Workspace', title: 'Projects' };
      case 'decisions':
        return { section: 'Governance', title: 'Decisions & ADRs' };
      case 'experts':
        return { section: 'Network', title: 'Subject Matter Experts' };
      case 'feedback':
        return { section: 'Governance & Ops', title: 'Expert Review & Feedback' };
      case 'system-health':
        return { section: 'Governance & Ops', title: 'Brain System Health' };
      case 'ingest':
        return { section: 'Knowledge Ingestion', title: 'Active Pipeline' };
      case 'architecture':
        return { section: 'Engineering', title: 'System Architecture & Schemas' };
      default:
        return { section: 'Workspace', title: 'Overview' };
    }
  };

  const breadcrumb = getBreadcrumb();

  const notifications = [
    {
      id: 1,
      title: 'Ticket #KB-4921 Awaiting Sign-off',
      desc: 'Expert correction for Phoenix database architecture needs Arbiter approval',
      time: '26m ago',
      path: 'feedback' as NavigationPath,
      unread: true
    },
    {
      id: 2,
      title: 'New Document Ingested',
      desc: 'Q3_Infrastructure_Cost_Model.xlsx (410 vectors) synchronized',
      time: '1h ago',
      path: 'knowledge' as NavigationPath,
      unread: true
    },
    {
      id: 3,
      title: 'ADR-104 Consensus Reached',
      desc: 'Approved PostgreSQL over NoSQL cluster ratified by Architecture Review Board',
      time: 'Yesterday',
      path: 'decisions' as NavigationPath,
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-40 h-14 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/15 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">
        {/* Left: Breadcrumbs & Memory Lake Beacon */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 font-label-md text-xs sm:text-sm text-on-surface-variant">
            <span
              onClick={() => onNavigate('brain')}
              className="text-outline hover:text-on-surface cursor-pointer font-medium"
            >
              Nexus
            </span>
            <span className="text-outline/60">/</span>
            <span className="text-outline/80 hidden sm:inline">{breadcrumb.section}</span>
            <span className="text-outline/60 hidden sm:inline">/</span>
            <span className="text-on-surface font-semibold truncate max-w-[140px] sm:max-w-none">
              {breadcrumb.title}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-low text-[11px] font-mono-code text-tertiary border border-tertiary-fixed/30">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            <span>Memory Lake Active</span>
          </div>
        </div>

        {/* Center: Omni-Search trigger */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 h-9 w-full px-3 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all text-left group border border-outline-variant/20 focus:outline-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-outline group-hover:text-primary transition-colors">
              search
            </span>
            <span className="text-xs text-outline flex-1 truncate">
              Search documents, ADRs, projects, experts...
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface font-mono-code text-[10px] text-outline shadow-xs border border-outline-variant/30">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Quick actions, notifications, user avatar */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('ask')}
            className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/95 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>Ask Brain</span>
          </button>

          <button
            onClick={() => onNavigate('ingest')}
            className="hidden md:flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold hover:bg-surface-container transition-colors border border-outline-variant/20 cursor-pointer"
            title="Upload or Ingest Document"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">cloud_upload</span>
            <span className="hidden lg:inline">Ingest</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="relative flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-space-md z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface">
                    Notifications &amp; Activity
                  </span>
                  <span className="font-mono-code text-[11px] text-tertiary">Real-time mesh</span>
                </div>
                <div className="divide-y divide-outline-variant/10 max-h-80 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onNavigate(n.path);
                        setShowNotifications(false);
                      }}
                      className="py-2.5 px-2 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-xs font-semibold text-on-surface truncate">
                          {n.title}
                        </span>
                        <span className="font-mono-code text-[10px] text-outline">{n.time}</span>
                      </div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User profile avatar */}
          <div
            className="flex items-center pl-1 cursor-pointer"
            onClick={() => onNavigate('experts')}
            title="Alex Morgan (Tech Lead)"
          >
            <img
              alt="Alex Morgan"
              className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary transition-all"
              src={AVATARS.alex}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
