import React, { useState } from 'react';
import {
  GitBranch,
  ExternalLink,
  CheckCircle,
  Copy,
  Check,
  X,
  Sparkles,
  Terminal,
  ShieldAlert
} from 'lucide-react';

interface VercelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelGuideModal: React.FC<VercelGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Create a GitHub Repository',
      desc: 'Go to github.com/new and create a new public or private repository (e.g. `sunshine-international-school`).',
      command: 'git init\ngit add .\ngit commit -m "feat: complete sunshine international school website"\ngit branch -M main\ngit remote add origin https://github.com/<YOUR_USER>/<YOUR_REPO>.git\ngit push -u origin main'
    },
    {
      title: '2. Connect Repository on Vercel',
      desc: 'Sign in to vercel.com with your GitHub account, click "Add New... → Project", and import your newly created repository.',
      command: null
    },
    {
      title: '3. Verify Build Settings & Click Deploy',
      desc: 'Vercel will automatically detect Vite. The settings configured in vercel.json ensure everything works out of the box:',
      command: 'Framework Preset: Vite\nBuild Command: npm run build\nOutput Directory: dist'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="bg-[#111827] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 116 100">
                <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-sans font-bold text-base">Deploy Through GitHub to Vercel</h3>
              <p className="text-xs text-neutral-400">Step-by-step instructions for zero-config live deployment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-neutral-700 max-h-[75vh] overflow-y-auto">
          
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Pre-configured for Vercel:</strong> We have already created <code>vercel.json</code> with SPA rewrites and verified that <code>npm run build</code> builds cleanly to <code>dist/</code>!
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((st, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
                <div className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                  <span>{st.title}</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  {st.desc}
                </p>

                {st.command && (
                  <div className="relative mt-2">
                    <pre className="bg-neutral-900 text-green-400 p-3 rounded-lg text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {st.command}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(st.command!, i)}
                      className="absolute top-2 right-2 p-1.5 rounded bg-neutral-800 text-neutral-300 hover:text-white text-[10px] flex items-center gap-1 cursor-pointer"
                      title="Copy commands"
                    >
                      {copiedIndex === i ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-neutral-200">
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#7B1113] hover:underline font-bold"
            >
              <span>Open Vercel Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="bg-neutral-900 hover:bg-black text-white px-5 py-2 rounded-lg font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
