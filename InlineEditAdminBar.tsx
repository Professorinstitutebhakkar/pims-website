import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  Edit3,
  Sliders,
  Sparkles,
  Check,
  Copy,
  RotateCcw,
  Eye,
  Settings,
  Layers,
  Globe
} from 'lucide-react';

interface InlineEditAdminBarProps {
  onOpenMenuEditor?: () => void;
  onOpenNetlifyDeploy?: () => void;
}

export const InlineEditAdminBar: React.FC<InlineEditAdminBarProps> = ({
  onOpenMenuEditor,
  onOpenNetlifyDeploy
}) => {
  const {
    isInlineEditActive,
    setIsInlineEditActive,
    setIsFullCMSOpen,
    config,
    resetConfig
  } = useSiteConfig();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside 
      aria-label="Site Editor Toolbar"
      className="sticky top-0 z-50 w-full bg-neutral-900 text-white text-xs py-2 px-4 shadow-lg border-b border-neutral-700 flex flex-wrap items-center justify-between gap-3 font-sans"
    >
      {/* Left: Mode Indicators */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <Settings className="w-4 h-4 animate-spin-slow" />
          <span>SITE EDITING ENGINE:</span>
        </div>

        {/* Toggle On-Page Inline Editing */}
        <button
          onClick={() => setIsInlineEditActive(prev => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] transition-all cursor-pointer ${
            isInlineEditActive
              ? 'bg-amber-400 text-neutral-950 shadow-md ring-2 ring-amber-300'
              : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
          }`}
          title="Click to toggle live on-page inline text editing"
        >
          {isInlineEditActive ? (
            <>
              <Edit3 className="w-3.5 h-3.5 text-neutral-950" />
              <span>Click-to-Edit ON (Click any text!)</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Turn On Click-to-Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {onOpenMenuEditor && (
          <button
            onClick={onOpenMenuEditor}
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Edit navigation headers and dropdown sub-menus"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-950" />
            <span>Edit Sub Menus</span>
          </button>
        )}

        {onOpenNetlifyDeploy && (
          <button
            onClick={onOpenNetlifyDeploy}
            className="bg-teal-600 hover:bg-teal-500 text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Deploy this site to Netlify with instructions and configuration"
          >
            <Globe className="w-3.5 h-3.5 text-teal-200" />
            <span>Deploy to Netlify</span>
          </button>
        )}

        <button
          onClick={() => setIsFullCMSOpen(true)}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 hover:text-white px-3 py-1 rounded-md font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
          title="Open complete CMS studio to edit all sections and cards"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Open Full CMS Studio</span>
        </button>

        <button
          onClick={handleCopy}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          title="Copy complete site JSON backup"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy JSON'}</span>
        </button>

        <button
          onClick={resetConfig}
          className="text-neutral-400 hover:text-red-400 px-2 py-1 text-[11px] transition-colors cursor-pointer"
          title="Reset back to default Sunshine School"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
