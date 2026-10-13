import React, { useState } from 'react';
import {
  X,
  Globe,
  UploadCloud,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  FileCode,
  FolderGit2,
  Sparkles
} from 'lucide-react';

interface NetlifyDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyDeployModal: React.FC<NetlifyDeployModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'git' | 'drag' | 'cli'>('git');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <Globe className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Deploy to Netlify</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-teal-400/20 text-teal-200 border border-teal-300/30 px-2 py-0.5 rounded-full">
                  Pre-Configured
                </span>
              </div>
              <p className="text-xs text-teal-100/80">
                Your site is pre-configured with <code className="bg-white/15 px-1 py-0.5 rounded text-white font-mono">netlify.toml</code> & SPA routing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('git')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer border-t border-x ${
              activeTab === 'git'
                ? 'bg-white text-teal-700 border-slate-200 -mb-px shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Option 1: GitHub / GitLab (Recommended)</span>
          </button>

          <button
            onClick={() => setActiveTab('drag')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer border-t border-x ${
              activeTab === 'drag'
                ? 'bg-white text-teal-700 border-slate-200 -mb-px shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Option 2: Drag & Drop dist/ Folder</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer border-t border-x ${
              activeTab === 'cli'
                ? 'bg-white text-teal-700 border-slate-200 -mb-px shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Option 3: Netlify CLI</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {/* Pre-configured notification */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 space-y-1">
              <p className="font-bold">
                ✓ Ready for Netlify: <code className="bg-emerald-100 px-1 py-0.5 rounded">netlify.toml</code> and <code className="bg-emerald-100 px-1 py-0.5 rounded">public/_redirects</code> have already been created!
              </p>
              <p className="text-emerald-800">
                Netlify will automatically detect the build command (<code className="bg-emerald-100 px-1 rounded font-mono">npm run build</code>) and publish directory (<code className="bg-emerald-100 px-1 rounded font-mono">dist</code>) without any manual typing.
              </p>
            </div>
          </div>

          {activeTab === 'git' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">1</span>
                Connect Git Repository to Netlify (Continuous Deployment)
              </h4>

              <ol className="space-y-3 pl-2">
                <li className="flex items-start gap-2.5 text-xs">
                  <span className="font-bold text-slate-900 mt-0.5">Step 1:</span>
                  <div>
                    Log in or create a free account at{' '}
                    <a
                      href="https://app.netlify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 font-bold underline inline-flex items-center gap-1"
                    >
                      app.netlify.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 text-xs">
                  <span className="font-bold text-slate-900 mt-0.5">Step 2:</span>
                  <div>
                    Click <strong>"Add new site"</strong> &rarr; <strong>"Import an existing project"</strong>.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 text-xs">
                  <span className="font-bold text-slate-900 mt-0.5">Step 3:</span>
                  <div>
                    Select your Git provider (<strong>GitHub</strong>, <strong>GitLab</strong>, or <strong>Bitbucket</strong>) and choose this repository.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 text-xs">
                  <span className="font-bold text-slate-900 mt-0.5">Step 4:</span>
                  <div className="w-full space-y-2">
                    <p>Verify the Build Settings (auto-detected from your new <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">netlify.toml</code>):</p>
                    <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] space-y-1">
                      <div className="flex justify-between items-center py-0.5 border-b border-slate-800">
                        <span className="text-slate-400">Build command:</span>
                        <span className="text-teal-400 font-bold">npm run build</span>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-slate-800">
                        <span className="text-slate-400">Publish directory:</span>
                        <span className="text-teal-400 font-bold">dist</span>
                      </div>
                      <div className="flex justify-between items-center py-0.5">
                        <span className="text-slate-400">Node version:</span>
                        <span className="text-teal-400 font-bold">20.x (default)</span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 text-xs">
                  <span className="font-bold text-slate-900 mt-0.5">Step 5:</span>
                  <div>
                    Click <strong>"Deploy site"</strong>! Within 1 minute, your live URL (e.g.{' '}
                    <code className="bg-slate-100 text-teal-700 px-1.5 py-0.5 rounded font-mono">https://professors-institute.netlify.app</code>
                    ) will be ready with free global CDN and HTTPS SSL certificate.
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'drag' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">2</span>
                Manual Upload: Drag & Drop the <code className="text-teal-700 font-mono">dist</code> Directory
              </h4>

              <p className="text-xs text-slate-600">
                If you don't use Git, you can build the site locally and simply drop the produced <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">dist</code> folder right into Netlify.
              </p>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                  <span>Step A: Run build in your terminal</span>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'build-cmd')}
                    className="flex items-center gap-1 text-teal-400 hover:text-teal-300 cursor-pointer"
                  >
                    {copiedKey === 'build-cmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'build-cmd' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-emerald-400">$ npm run build</div>
                <div className="text-slate-400 text-[11px]">
                  &rarr; This generates an optimized static bundle inside the <strong className="text-white">dist/</strong> folder.
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <p className="font-bold text-slate-900">Step B: Drop folder onto Netlify</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 pl-1">
                  <li>
                    Visit{' '}
                    <a
                      href="https://app.netlify.com/drop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 font-bold underline inline-flex items-center gap-1"
                    >
                      app.netlify.com/drop <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>Drag the generated <strong>dist</strong> folder directly into the upload area.</li>
                  <li>Netlify immediately launches your live website!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">3</span>
                Deploy using Netlify CLI in Terminal
              </h4>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                  <span>Commands to deploy:</span>
                  <button
                    onClick={() => copyToClipboard('npx netlify deploy --prod --dir=dist', 'cli-cmd')}
                    className="flex items-center gap-1 text-teal-400 hover:text-teal-300 cursor-pointer"
                  >
                    {copiedKey === 'cli-cmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'cli-cmd' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-400"># 1. Build the production files</div>
                  <div className="text-teal-400">npm run build</div>
                  <div className="text-slate-400 mt-2"># 2. Deploy directly to Netlify production</div>
                  <div className="text-teal-400">npx netlify deploy --prod --dir=dist</div>
                </div>
              </div>
            </div>
          )}

          {/* Configuration File Inspect */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-mono">
                <FileCode className="w-3.5 h-3.5 text-teal-700" />
                netlify.toml (already generated & saved)
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    `[build]\n  command = "npm run build"\n  publish = "dist"\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200`,
                    'toml'
                  )
                }
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'toml' ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'toml' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono bg-slate-950 text-slate-200 overflow-x-auto leading-relaxed">
{`[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Custom domain (e.g. <span className="font-semibold text-slate-700">professorsinstitute.edu.pk</span>) can also be added in Netlify Domain Settings for free.</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://app.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Go to Netlify Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="bg-white hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
