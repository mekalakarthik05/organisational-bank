import React, { useState, useEffect } from 'react';
import { NavigationPath } from '../types';
import { AVATARS } from '../data/mockData';

interface KnowledgeIngestProps {
  onNavigate: (path: NavigationPath, queryParam?: string) => void;
  onShowToast: (msg: string) => void;
}

export const KnowledgeIngest: React.FC<KnowledgeIngestProps> = ({ onNavigate, onShowToast }) => {
  const [progressPercent, setProgressPercent] = useState(84);
  const [tokenCount, setTokenCount] = useState(18420);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string>('Phoenix_Database_Migration_Plan_v2.pdf');
  const [category, setCategory] = useState('Architecture Decision Record (ADR)');
  const [recentItems, setRecentItems] = useState([
    {
      id: 1,
      name: 'Q3_Infrastructure_Cost_Model.xlsx',
      meta: 'Indexed 18m ago · 410 vectors · FinOps',
      status: 'Ready',
      statusClass: 'bg-tertiary-fixed/40 text-tertiary'
    },
    {
      id: 2,
      name: 'Kubernetes_Federation_RFC.md',
      meta: 'Indexed 1h ago · 892 vectors · Cloud Platform',
      status: 'Ready',
      statusClass: 'bg-tertiary-fixed/40 text-tertiary'
    },
    {
      id: 3,
      name: 'Global_Identity_Auth_Specs.docx',
      meta: 'Chunking pass 2 of 3 · Security Core',
      status: 'Embedding',
      statusClass: 'bg-primary-fixed text-primary'
    },
    {
      id: 4,
      name: 'Vendor_Contract_Anonymized.pdf',
      meta: 'Low OCR confidence on page 14',
      status: 'Review Needed',
      statusClass: 'bg-error-container text-on-error-container'
    }
  ]);

  // Live progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev < 99) {
          const next = prev + 1;
          setTokenCount((c) => c + Math.floor(Math.random() * 30) + 10);
          return next;
        }
        return 99;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      setProgressPercent(15);
      onShowToast(`Uploaded ${file.name}. Starting AST extraction and vector chunking...`);
    }
  };

  const handleCommit = () => {
    onShowToast(`Confirmed & Committed index for "${uploadedFile}" into pgvector Memory Lake!`);
    setRecentItems((prev) => [
      {
        id: Date.now(),
        name: uploadedFile,
        meta: 'Just now · 768-dim embeddings committed',
        status: 'Ready',
        statusClass: 'bg-tertiary-fixed/40 text-tertiary'
      },
      ...prev
    ]);
  };

  return (
    <div className="py-4 sm:py-5 px-4 sm:px-6 lg:px-8 flex flex-col gap-5 max-w-7xl mx-auto w-full animate-in fade-in duration-200">
      {/* Page Header Block with Tactile Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="max-w-3xl flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-primary font-mono-code text-mono-code uppercase tracking-wider">
              Pipeline Engine v4.2
            </span>
            <span className="text-outline font-body-sm text-body-sm">
              · Stream: Async Worker Pool #08
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Ingest &amp; Index Knowledge
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Upload organizational documents into the decentralized memory lake. The Brain extracts semantic entities, computes high-dimensional vector embeddings via Hindsight Multilingual-v2, and dynamically anchors insights to live projects and decision records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs shrink-0">
          <button
            onClick={() => onNavigate('system-health')}
            className="flex items-center gap-space-xs h-9 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px] text-outline">description</span>
            <span>Ingestion Logs</span>
          </button>
          <button
            onClick={() => onShowToast('Connecting to Notion & Confluence OAuth gateway...')}
            className="flex items-center gap-space-xs h-9 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">share</span>
            <span>Connect Notion / Confluence</span>
          </button>
          <label className="flex items-center gap-space-xs h-9 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-md cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
            <span>Batch Upload</span>
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Metric Telemetry Strip: 4 High-Signal Units */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Metric 1 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-sm gap-space-xs relative overflow-hidden border border-outline-variant/15">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Documents Ingested</span>
            <span className="material-symbols-outlined text-[18px]">folder_special</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              248
            </span>
            <span className="font-mono-code text-mono-code text-tertiary flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>+14 this week
            </span>
          </div>
          <div className="w-full bg-surface-container-low rounded-full h-1 mt-space-2xs overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-sm gap-space-xs relative overflow-hidden border border-outline-variant/15">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Total Vector Chunks</span>
            <span className="material-symbols-outlined text-[18px]">grain</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              38,412
            </span>
            <span className="font-mono-code text-mono-code text-secondary flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1"></span>pgvector active
            </span>
          </div>
          <div className="w-full bg-surface-container-low rounded-full h-1 mt-space-2xs overflow-hidden">
            <div className="bg-secondary-container h-full rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-sm gap-space-xs relative overflow-hidden border border-outline-variant/15">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Throughput Latency</span>
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              1.2s
            </span>
            <span className="font-mono-code text-mono-code text-outline">/ doc avg</span>
          </div>
          <div className="w-full bg-surface-container-low rounded-full h-1 mt-space-2xs overflow-hidden">
            <div className="bg-tertiary-container h-full rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-sm gap-space-xs relative overflow-hidden border border-outline-variant/15">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Vector Embedding Model</span>
            <span className="material-symbols-outlined text-[18px]">psychology</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
              Hindsight Multilingual-v2
            </span>
            <span className="font-mono-code text-mono-code text-tertiary flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[13px]">verified</span> Cosine sim 0.94+
            </span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Pipeline Execution & Drop Target (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md min-w-0">
          {/* Multi-stage Live Processing Card */}
          <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/15">
            {/* Header */}
            <div className="flex items-start justify-between gap-space-md">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[24px]">picture_as_pdf</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                      {uploadedFile}
                    </span>
                    <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-mono-code text-[10px]">
                      6.4 MB
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm">
                    <span>SHA-256: d8f3a9e...4b12</span>
                    <span>·</span>
                    <span>Target partition: /infra/core-db</span>
                  </div>
                </div>
              </div>

              {/* Progress pill */}
              <div className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-primary/10 text-primary font-mono-code text-mono-code shrink-0">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span>{progressPercent}%</span>
              </div>
            </div>

            {/* Overall Pipeline Completion Progress Bar */}
            <div className="flex flex-col gap-space-2xs">
              <div className="flex justify-between items-center text-outline font-label-sm text-label-sm">
                <span>Overall Pipeline Completion</span>
                <span className="font-mono-code">Step 4 of 5</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-low overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* 5-Stage Step Visualizer */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              {/* Step 1 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low/50 border border-outline-variant/10">
                <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs min-w-0">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      1. Ingestion Handshake &amp; Hash Validation
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Binary stream buffered, anti-malware verified
                    </span>
                  </div>
                  <span className="font-mono-code text-mono-code text-tertiary shrink-0">
                    2.4s upload verified
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low/50 border border-outline-variant/10">
                <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs min-w-0">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      2. Text &amp; AST Layout Extraction <span className="font-mono-code text-outline text-[11px]">[documents.py]</span>
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Structural headings, tabular diagrams, markdown layout tree
                    </span>
                  </div>
                  <span className="font-mono-code text-mono-code text-tertiary shrink-0">
                    142 pages parsed
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low/50 border border-outline-variant/10">
                <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-2xs min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      3. Semantic Entity Resolution
                    </span>
                    <span className="font-mono-code text-mono-code text-secondary shrink-0">
                      4 entities found
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-2xs mt-1">
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Project Phoenix
                    </span>
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>PostgreSQL 15
                    </span>
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>ADR-042
                    </span>
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>Alex Morgan
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm animate-spin">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                </div>
                <div className="flex-1 flex flex-col justify-between gap-space-2xs min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-md text-label-md font-semibold text-primary">
                        4. Vector Embedding &amp; Dynamic Chunking
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary font-mono-code text-[10px]">
                        Hindsight Cloud
                      </span>
                    </div>
                    <span className="font-mono-code text-mono-code text-primary font-semibold">
                      Generating 768-dim embeddings...
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Context window: 512 tokens · Overlap stride: 64 tokens · Cosine distance index
                  </span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low/30 opacity-75 border border-outline-variant/10">
                <div className="w-6 h-6 rounded-full bg-surface-container-high text-outline flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs min-w-0">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-medium text-on-surface">
                      5. Knowledge Graph Cross-Linking
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Establish bidirectional edges with existing team decisions and repos
                    </span>
                  </div>
                  <span className="font-mono-code text-mono-code text-outline shrink-0">
                    Queued (12 target nodes)
                  </span>
                </div>
              </div>
            </div>

            {/* Live Ingestion Telemetry Drawer */}
            <div className="flex flex-col rounded-xl bg-inverse-surface text-inverse-on-surface overflow-hidden shadow-inner border border-outline-variant/30">
              <button
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className="w-full px-space-md py-space-sm flex items-center justify-between bg-inverse-surface hover:bg-inverse-surface/90 text-left transition-colors"
              >
                <div className="flex items-center gap-space-xs font-mono-code text-mono-code">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">terminal</span>
                  <span className="text-inverse-on-surface font-semibold">Live Streaming Telemetry</span>
                  <span className="text-outline text-xs">·</span>
                  <span className="text-primary-fixed">{tokenCount.toLocaleString()} tokens</span>
                </div>
                <div className="flex items-center gap-space-xs font-mono-code text-xs text-outline">
                  <span>Tail -f</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform ${
                      isTerminalOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </button>

              {isTerminalOpen && (
                <div className="px-space-md py-space-sm font-mono-code text-mono-code text-[11px] leading-relaxed flex flex-col gap-1 border-t border-inverse-on-surface/10 bg-inverse-surface">
                  <div className="flex gap-space-xs text-outline">
                    <span className="text-primary-fixed">[14:32:01.04]</span>
                    <span className="text-tertiary-fixed">INFO</span>
                    <span>chunk_0489: tokens=488 dim=768 norm=0.9998 cosine_anchor="DB_FAILOVER_POLICY"</span>
                  </div>
                  <div className="flex gap-space-xs text-outline">
                    <span className="text-primary-fixed">[14:32:02.18]</span>
                    <span className="text-tertiary-fixed">INFO</span>
                    <span>chunk_0490: tokens=511 dim=768 norm=1.0000 cosine_anchor="POSTGRESQL_REPLICATION"</span>
                  </div>
                  <div className="flex gap-space-xs text-outline">
                    <span className="text-primary-fixed">[14:32:03.45]</span>
                    <span className="text-secondary-fixed">RESOLVE</span>
                    <span>Matched anchor "PRJ-PHX" -&gt; node_id=0x9f44a (sim_score=0.982)</span>
                  </div>
                  <div className="flex gap-space-xs text-outline">
                    <span className="text-primary-fixed">[14:32:04.90]</span>
                    <span className="text-tertiary-fixed">INFO</span>
                    <span className="text-inverse-on-surface animate-pulse">
                      Streaming vectors to memory lake cluster /us-east-hindsight-02...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generous Drag & Drop Upload Zone */}
          <label className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-xl flex flex-col items-center justify-center text-center gap-space-md transition-all hover:shadow-md cursor-pointer border border-dashed border-outline-variant/40 group">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high group-hover:bg-primary/10 transition-colors flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">upload_file</span>
            </div>
            <div className="flex flex-col gap-space-2xs max-w-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Drop project documents or lake payloads
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Drag and drop PDF, DOCX, Markdown, or Notion exports directly here. Real-time RAG chunking and auto-categorization commence instantly upon drop.
              </p>
            </div>

            {/* Format Pills */}
            <div className="flex flex-wrap items-center justify-center gap-space-2xs">
              <span className="px-space-xs py-1 rounded-md bg-surface-container-low text-on-surface font-mono-code text-[11px]">
                .PDF (OCR enabled)
              </span>
              <span className="px-space-xs py-1 rounded-md bg-surface-container-low text-on-surface font-mono-code text-[11px]">
                .MD / Markdown
              </span>
              <span className="px-space-xs py-1 rounded-md bg-surface-container-low text-on-surface font-mono-code text-[11px]">
                .DOCX
              </span>
              <span className="px-space-xs py-1 rounded-md bg-surface-container-low text-on-surface font-mono-code text-[11px]">
                Notion .zip
              </span>
              <span className="px-space-xs py-1 rounded-md bg-surface-container-low text-on-surface font-mono-code text-[11px]">
                OpenAPI YAML
              </span>
            </div>

            <div className="flex items-center gap-space-sm pt-space-xs">
              <span className="h-10 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md flex items-center">
                Browse Local Files
              </span>
              <span className="text-outline font-label-sm text-label-sm">
                or press <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-on-surface font-mono-code text-xs">⌘U</kbd>
              </span>
            </div>
          </label>
        </div>

        {/* Right Column: Auto-Extracted Metadata & Recent Ingestions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          {/* Metadata Form Panel */}
          <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_fix_high</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Auto-Detected Metadata
                </h2>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed/50 text-secondary font-mono-code text-[10px]">
                Pre-Canonical Lock
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant -mt-space-xs">
              Extracted via Hindsight context parser. Validate or adjust tags before vector persistence locks this payload into global graph memory.
            </p>

            <div className="flex flex-col gap-space-sm">
              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Document Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:bg-surface-container-high transition-colors border border-outline-variant/20"
                  >
                    <option value="Architecture Decision Record (ADR)">
                      Architecture Decision Record (ADR)
                    </option>
                    <option value="Technical Specification (RFC)">
                      Technical Specification (RFC)
                    </option>
                    <option value="Incident Postmortem">Incident Postmortem</option>
                    <option value="Executive Strategy Memo">Executive Strategy Memo</option>
                    <option value="Security Compliance Audit">Security Compliance Audit</option>
                  </select>
                  <span className="material-symbols-outlined text-[18px] text-outline absolute right-3 top-2.5 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Associated Project */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Associated Project Anchor
                </label>
                <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low border border-outline-variant/15">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-mono-code text-xs font-bold">
                      P
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      Project Phoenix (PRJ-PHX)
                    </span>
                  </div>
                  <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed/50 text-tertiary font-mono-code text-[10px]">
                    99.4% Match
                  </span>
                </div>
              </div>

              {/* Primary Knowledge Owner */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Primary Knowledge Owner
                </label>
                <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low border border-outline-variant/15">
                  <div className="flex items-center gap-space-xs min-w-0">
                    <img
                      alt="Alex Morgan"
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                      src={AVATARS.alex}
                    />
                    <span className="font-label-md text-label-md text-on-surface truncate">
                      Alex Morgan (Tech Lead)
                    </span>
                  </div>
                  <button
                    onClick={() => onShowToast('Owner editing dialog')}
                    className="text-outline hover:text-on-surface text-label-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Security Access Level */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Security Access Level
                </label>
                <div className="flex items-center gap-space-xs">
                  <span className="flex items-center gap-1 px-space-sm py-1 rounded-full bg-secondary-fixed/50 text-secondary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    <span>Internal Engineering (Tier 2)</span>
                  </span>
                </div>
              </div>

              {/* AI Executive Abstract */}
              <div className="flex flex-col gap-1 pt-space-xs">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  AI Executive Abstract
                </label>
                <div className="p-space-sm rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface leading-relaxed relative border border-outline-variant/15">
                  "Detailed failover and replication strategy for PostgreSQL 15 migration with zero-downtime ledger consistency guarantees across primary and secondary multi-region zones."
                </div>
              </div>

              {/* Commit & Lock Buttons */}
              <div className="pt-space-xs flex items-center justify-end gap-space-xs">
                <button
                  onClick={() => onShowToast('Ingestion discarded')}
                  className="h-9 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                >
                  Discard Ingest
                </button>
                <button
                  onClick={handleCommit}
                  className="h-9 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-2xs shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Confirm &amp; Commit Index</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Ingestions Queue List */}
          <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-outline text-[20px]">history</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Recent Ingestions
                </h2>
              </div>
              <button
                onClick={() => onNavigate('knowledge')}
                className="font-label-md text-label-md text-primary hover:underline"
              >
                View All (248)
              </button>
            </div>

            <div className="flex flex-col gap-space-xs">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onShowToast(`Inspecting ${item.name}`)}
                  className="flex items-center justify-between p-space-sm rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-space-xs min-w-0">
                    <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
                      check_circle
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-outline truncate">
                        {item.meta}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-space-xs py-0.5 rounded-full font-mono-code text-[10px] shrink-0 ${item.statusClass}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Graph Memory Topology Callout */}
      <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-lg overflow-hidden relative border border-outline-variant/15">
        <div className="flex items-center gap-space-md z-10">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[28px]">hub</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Decentralized Memory Lake Topology
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Documents uploaded here are linked automatically to the Organizational Graph. 14 team members and 3 active sprint backlogs will receive contextual recall chips.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm z-10 shrink-0">
          <button
            onClick={() => onNavigate('architecture')}
            className="h-9 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center gap-space-xs border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Inspect Ingestion Graph</span>
          </button>
        </div>

        {/* Background Vector Graphic */}
        <svg
          className="absolute right-0 top-0 bottom-0 h-full w-96 text-primary/5 pointer-events-none"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 400 120"
        >
          <circle cx="80" cy="60" fill="currentColor" r="4" />
          <circle cx="160" cy="30" fill="currentColor" r="5" />
          <circle cx="240" cy="80" fill="currentColor" r="6" />
          <circle cx="320" cy="40" fill="currentColor" r="4" />
          <circle cx="380" cy="90" fill="currentColor" r="5" />
          <line stroke="currentColor" strokeWidth="1.5" x1="80" x2="160" y1="60" y2="30" />
          <line stroke="currentColor" strokeWidth="1.5" x1="160" x2="240" y1="30" y2="80" />
          <line stroke="currentColor" strokeWidth="1.5" x1="240" x2="320" y1="80" y2="40" />
          <line stroke="currentColor" strokeWidth="1.5" x1="320" x2="380" y1="40" y2="90" />
        </svg>
      </div>
    </div>
  );
};
