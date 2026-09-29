import React, { useState } from 'react';
import { NavigationPath, ProjectItem } from '../types';
import { INITIAL_PROJECTS, INITIAL_DECISIONS, INITIAL_KNOWLEDGE_ITEMS } from '../data/mockData';

interface ProjectsViewProps {
  onNavigate: (path: NavigationPath, queryParam?: string) => void;
  onShowToast: (msg: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate, onShowToast }) => {
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lead.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = selectedTier === 'All' ? true : p.tier === selectedTier;
    const matchesStatus = selectedStatus === 'All' ? true : p.status.includes(selectedStatus);

    return matchesSearch && matchesTier && matchesStatus;
  });

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Top Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-outline-variant/15 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-mono-code text-[11px] font-semibold mb-2">
              <span className="material-symbols-outlined text-[13px]">folder_supervised</span>
              <span>ORGANIZATIONAL INITIATIVES · ACTIVE NODES</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-on-surface tracking-tight font-display">
              Projects & Strategic Initiatives
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Cross-functional initiatives grounded in institutional memory, verified ADRs, and live specs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('ingest')}
              className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold flex items-center gap-2 border border-outline-variant/30 transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">cloud_upload</span>
              <span>Ingest Initiative Docs</span>
            </button>
            <button
              onClick={() => onNavigate('ask', 'Compare architecture across Project Phoenix and Project Atlas')}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-on-primary text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">neurology</span>
              <span>Ask Brain About Projects</span>
            </button>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, code, description, or lead..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface-container-low rounded-lg border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Tier Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider font-mono-code mr-1">
              Tier:
            </span>
            {['All', 'Tier-1 Core', 'Tier-2 Critical'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/20'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider font-mono-code mr-1">
              Status:
            </span>
            {['All', 'Active', 'Beta', 'In Review'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-secondary text-on-secondary font-semibold shadow-xs'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/20'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-5 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const linkedDecisions = INITIAL_DECISIONS.filter(
              (d) => d.project.toLowerCase() === project.name.toLowerCase()
            );
            const linkedDocs = INITIAL_KNOWLEDGE_ITEMS.filter(
              (k) => k.project.toLowerCase() === project.name.toLowerCase()
            );

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-fixed/20 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono-code text-[11px] px-2 py-0.5 rounded-md bg-surface-container font-bold text-primary border border-outline-variant/30">
                      {project.code}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        project.status.includes('Active')
                          ? 'bg-tertiary-fixed/40 text-tertiary border border-tertiary/20'
                          : 'bg-secondary-fixed/40 text-secondary border border-secondary/20'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-primary transition-all">
                      arrow_forward
                    </span>
                  </h3>

                  <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-outline-variant/15 flex items-center justify-between text-xs">
                    <span className="text-outline text-[11px] font-medium">{project.department}</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px] font-semibold">
                      {project.tier}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-outline-variant/15">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={project.leadAvatar}
                        alt={project.lead}
                        className="w-6 h-6 rounded-full object-cover border border-outline-variant/30"
                      />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-on-surface">{project.lead}</span>
                        <span className="text-[9px] text-outline">Lead Architect</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-outline font-mono-code">{project.lastUpdated}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-surface-container-low rounded-lg p-2 text-center text-xs">
                    <div>
                      <div className="font-bold text-on-surface font-mono-code">{project.documentsCount}</div>
                      <div className="text-[10px] text-outline">Ingested Specs</div>
                    </div>
                    <div className="border-l border-outline-variant/20">
                      <div className="font-bold text-primary font-mono-code">{project.decisionsCount}</div>
                      <div className="text-[10px] text-outline">Ratified ADRs</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('ask', `Summarize all architectural decisions and risks for ${project.name}`);
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px] text-primary">chat_bubble</span>
                      <span>Query Brain</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-primary-fixed/40 hover:bg-primary-fixed/70 text-primary text-[11px] font-semibold transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Detail Slide-over Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-outline-variant/20 flex items-start justify-between bg-surface-container-low">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs px-2.5 py-0.5 rounded-md bg-surface font-bold text-primary border border-outline-variant/30">
                    {selectedProject.code}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-tertiary-fixed/40 text-tertiary">
                    {selectedProject.status}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                    {selectedProject.tier}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-on-surface mt-2">{selectedProject.name}</h2>
                <p className="text-xs text-on-surface-variant mt-1">{selectedProject.description}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-3 gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant/15">
                <div>
                  <span className="text-[10px] text-outline uppercase font-mono-code">Engineering Lead</span>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={selectedProject.leadAvatar}
                      alt={selectedProject.lead}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-semibold text-on-surface">{selectedProject.lead}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase font-mono-code">Department</span>
                  <p className="font-semibold text-on-surface mt-1">{selectedProject.department}</p>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase font-mono-code">Knowledge Sync</span>
                  <p className="font-semibold text-on-surface mt-1">{selectedProject.lastUpdated}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-on-surface uppercase tracking-wider text-[11px] mb-2 font-mono-code text-outline">
                  Linked Architecture Decision Records (ADRs)
                </h4>
                <div className="space-y-2">
                  {INITIAL_DECISIONS.filter(
                    (d) => d.project.toLowerCase() === selectedProject.name.toLowerCase()
                  ).length > 0 ? (
                    INITIAL_DECISIONS.filter(
                      (d) => d.project.toLowerCase() === selectedProject.name.toLowerCase()
                    ).map((adr) => (
                      <div
                        key={adr.id}
                        onClick={() => {
                          setSelectedProject(null);
                          onNavigate('decisions');
                        }}
                        className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono-code font-bold text-primary">{adr.adrNumber}</span>
                          <div>
                            <p className="font-semibold text-on-surface">{adr.title}</p>
                            <p className="text-[11px] text-outline mt-0.5 line-clamp-1">{adr.summary}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-tertiary-fixed/40 text-tertiary shrink-0">
                          {adr.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg bg-surface-container-low text-outline text-center">
                      No specific ADRs explicitly bound yet. Ingestion pending.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-on-surface uppercase tracking-wider text-[11px] mb-2 font-mono-code text-outline">
                  Related Knowledge Lake Artifacts
                </h4>
                <div className="space-y-2">
                  {INITIAL_KNOWLEDGE_ITEMS.filter(
                    (k) => k.project.toLowerCase() === selectedProject.name.toLowerCase()
                  ).map((k) => (
                    <div
                      key={k.id}
                      onClick={() => {
                        setSelectedProject(null);
                        onNavigate('knowledge');
                      }}
                      className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-secondary uppercase font-mono-code">
                          {k.type}
                        </span>
                        <p className="font-semibold text-on-surface mt-0.5">{k.title}</p>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-low flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('ingest');
                }}
                className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">cloud_upload</span>
                <span>Upload Specs</span>
              </button>
              <button
                onClick={() => {
                  const name = selectedProject.name;
                  setSelectedProject(null);
                  onNavigate('ask', `What are the critical dependencies, architecture, and timeline for ${name}?`);
                }}
                className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">neurology</span>
                <span>Launch Deep RAG Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
