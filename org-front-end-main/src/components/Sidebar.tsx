import React, { useState } from 'react';
import { NavigationPath } from '../types';
import { LOGO_URL, AVATARS } from '../data/mockData';

interface SidebarProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  pendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse,
  pendingCount = 3
}) => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState('Nexus Tech (Eng & Product)');

  const workspaces = [
    { name: 'Nexus Tech (Eng & Product)', code: 'N', desc: 'Core Engineering' },
    { name: 'Nexus Security & SecOps', code: 'S', desc: 'SOC2 & Infrastructure' },
    { name: 'Nexus Enterprise Global', code: 'E', desc: 'Cross-functional mesh' }
  ];

  const cognitiveItems: Array<{ path: NavigationPath; label: string; icon: string; count?: string | number }> = [
    { path: 'brain', label: 'Brain', icon: 'neurology' },
    { path: 'ask', label: 'Ask', icon: 'forum' },
    { path: 'knowledge', label: 'Knowledge', icon: 'hub' },
    { path: 'projects', label: 'Projects', icon: 'folder_supervised', count: 18 },
    { path: 'decisions', label: 'Decisions', icon: 'balance', count: 64 },
    { path: 'experts', label: 'Experts', icon: 'groups', count: 31 },
    { path: 'architecture', label: 'System Architecture', icon: 'account_tree' },
  ];

  const opsItems: Array<{ path: NavigationPath; label: string; icon: string; count?: string | number; badgeColor?: string }> = [
    { path: 'feedback', label: 'Feedback', icon: 'rate_review', count: pendingCount, badgeColor: 'bg-error-container text-on-error-container' },
    { path: 'system-health', label: 'System Health', icon: 'dns' },
    { path: 'ingest', label: 'Ingest Pipeline', icon: 'cloud_upload', count: 'Active', badgeColor: 'bg-primary-fixed text-primary' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none transition-all duration-300 border-r border-outline-variant/20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header Bar */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-outline-variant/15">
          <div
            className="flex items-center gap-space-xs cursor-pointer min-w-0"
            onClick={() => onNavigate('brain')}
          >
            <img
              alt="Nexus Org Brain"
              className="h-8 w-auto object-contain shrink-0 rounded-lg"
              src={LOGO_URL}
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface truncate">
                  Nexus
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant -mt-1 truncate">
                  Org Brain
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {collapsed ? 'dock_to_right' : 'dock_to_left'}
            </span>
          </button>
        </div>

        {/* Workspace Switcher */}
        {!collapsed ? (
          <div className="px-space-md py-space-xs relative">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
            >
              <div className="flex items-center gap-space-xs min-w-0">
                <div className="w-6 h-6 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-headline-sm text-xs font-bold shrink-0">
                  {currentWorkspace.charAt(0)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                    {currentWorkspace.split(' ')[0]} {currentWorkspace.split(' ')[1]}
                  </span>
                  <span className="font-label-sm text-label-sm text-outline truncate">
                    Eng &amp; Product
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0">
                unfold_more
              </span>
            </button>

            {workspaceMenuOpen && (
              <div className="absolute top-full left-4 right-4 mt-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg p-1 z-50">
                {workspaces.map((ws) => (
                  <button
                    key={ws.name}
                    onClick={() => {
                      setCurrentWorkspace(ws.name);
                      setWorkspaceMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-colors ${
                      currentWorkspace === ws.name
                        ? 'bg-primary-fixed text-primary font-semibold'
                        : 'hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <div className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                      {ws.code}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{ws.name}</span>
                      <span className="text-[10px] text-outline truncate">{ws.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-2 flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
              N
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <nav className="flex-1 px-space-xs py-space-xs flex flex-col gap-space-2xs overflow-y-auto">
          {!collapsed && (
            <div className="px-space-sm py-space-2xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Cognitive Workspace
              </span>
            </div>
          )}

          {cognitiveItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`flex items-center ${
                  collapsed ? 'justify-center px-0 py-2' : 'justify-between px-space-sm py-space-xs'
                } rounded-lg transition-all ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <span className="material-symbols-outlined text-[18px] shrink-0">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="font-label-md text-label-md truncate">{item.label}</span>
                  )}
                </div>
                {!collapsed && item.count !== undefined && (
                  <span className="font-mono-code text-[11px] text-outline px-1.5 py-0.2 rounded bg-surface-container-low">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {!collapsed && (
            <div className="px-space-sm pt-space-sm pb-space-2xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Governance &amp; Ops
              </span>
            </div>
          )}

          {opsItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`flex items-center ${
                  collapsed ? 'justify-center px-0 py-2' : 'justify-between px-space-sm py-space-xs'
                } rounded-lg transition-all ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <span className="material-symbols-outlined text-[18px] shrink-0">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="font-label-md text-label-md truncate">{item.label}</span>
                  )}
                </div>
                {!collapsed && item.count !== undefined && (
                  <span
                    className={`font-mono-code text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area with Real-time RAG Mesh status & User profile */}
      <div className="p-space-xs flex flex-col gap-space-xs bg-surface-container-lowest border-t border-outline-variant/10">
        {!collapsed ? (
          <div className="flex items-center justify-between px-space-sm py-space-xs rounded-lg bg-surface-container-low">
            <div className="flex items-center gap-space-xs min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-container"></span>
              </span>
              <span className="font-mono-code text-[11px] text-tertiary truncate">
                Brain Online · RAG Active
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-outline shrink-0">v4.2</span>
          </div>
        ) : (
          <div className="flex justify-center py-1" title="Brain Online · RAG Active v4.2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-container"></span>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between p-space-xs rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group">
          <div className="flex items-center gap-space-xs min-w-0">
            <img
              alt="Alex Morgan"
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-outline/20"
              src={AVATARS.alex}
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                  Alex Morgan
                </span>
                <span className="font-label-sm text-label-sm text-outline truncate">
                  Tech Lead &amp; Arbiter
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-on-surface">
              more_vert
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
