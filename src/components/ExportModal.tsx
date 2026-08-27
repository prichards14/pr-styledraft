import React, { useState } from 'react';
import { DesignTokens } from '../types';
import {
  generateCleanCSS,
  generateHTMLTemplate,
  generateJSONTokens,
  generateTailwindConfig,
} from '../utils/exportGenerators';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  FileJson,
  FileText,
  Palette,
  Terminal,
  Sparkles,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: DesignTokens;
}

type TabType = 'css' | 'html' | 'json' | 'tailwind';

export function ExportModal({ isOpen, onClose, tokens }: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('css');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cssCode = generateCleanCSS(tokens);
  const htmlCode = generateHTMLTemplate();
  const jsonCode = generateJSONTokens(tokens);
  const tailwindCode = generateTailwindConfig(tokens);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'css':
        return cssCode;
      case 'html':
        return htmlCode;
      case 'json':
        return jsonCode;
      case 'tailwind':
        return tailwindCode;
    }
  };

  const getFileName = () => {
    switch (activeTab) {
      case 'css':
        return 'tokens.css';
      case 'html':
        return 'index.html';
      case 'json':
        return 'design-tokens.json';
      case 'tailwind':
        return 'tailwind.config.js';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = getFileName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="export-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="export-modal-content"
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Developer Handoff Spec
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Ready to Deploy
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Clean CSS Variables, Semantic HTML5, and W3C Design Tokens
              </p>
            </div>
          </div>

          <button
            id="btn-close-export-modal"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 sm:px-5 border-b border-slate-800 bg-slate-950/60 flex-shrink-0">
          <div className="flex gap-2">
            <button
              id="export-tab-css"
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'css'
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>1. Clean CSS (:root)</span>
            </button>

            <button
              id="export-tab-html"
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'html'
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>2. HTML Template</span>
            </button>

            <button
              id="export-tab-json"
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'json'
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>3. JSON Tokens</span>
            </button>

            <button
              id="export-tab-tailwind"
              onClick={() => setActiveTab('tailwind')}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'tailwind'
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>4. Tailwind Config</span>
            </button>
          </div>

          <div className="flex items-center gap-2 py-2">
            <button
              id="btn-copy-code"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              id="btn-download-file"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {getFileName()}</span>
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
          <pre className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 overflow-x-auto text-[11px] sm:text-xs">
            <code>{getActiveCode()}</code>
          </pre>
        </div>

        {/* Modal Footer info */}
        <div className="p-3.5 px-5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              Theme: <strong className="text-slate-200 capitalize">{tokens.theme}</strong> • Font Pairing:{' '}
              <strong className="text-slate-200">{tokens.fontPair.name}</strong> • Ratio:{' '}
              <strong className="text-slate-200">{tokens.typeScale.ratio}</strong>
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
