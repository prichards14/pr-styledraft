import { useState, useEffect } from 'react';
import { DesignTokens } from './types';
import { DEFAULT_TOKENS } from './utils/constants';
import { getCssVariablesFromTokens } from './utils/contrast';
import { Sidebar } from './components/Sidebar';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [tokens, setTokens] = useState<DesignTokens>(() => {
    try {
      const saved = localStorage.getItem('styledraft_tokens_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_TOKENS;
  });

  const [isExportOpen, setIsExportOpen] = useState(false);

  // Synchronize CSS custom properties to document.documentElement as well for full CSS compliance
  useEffect(() => {
    try {
      localStorage.setItem('styledraft_tokens_v2', JSON.stringify(tokens));
      const vars = getCssVariablesFromTokens(tokens);
      const root = document.documentElement;
      Object.entries(vars).forEach(([key, val]) => {
        root.style.setProperty(key, val);
      });
    } catch {
      // ignore
    }
  }, [tokens]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans antialiased text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* 320px Guardrailed Control Sidebar */}
      <Sidebar
        tokens={tokens}
        onChange={setTokens}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Preview Canvas with 7 Homepage Sections */}
      <PreviewCanvas
        tokens={tokens}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Developer Handoff Spec Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        tokens={tokens}
      />
    </div>
  );
}
