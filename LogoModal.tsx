import React, { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  X,
  Image,
  Shield,
  GraduationCap,
  HeartPulse,
  Activity,
  Plus,
  Check,
  Sparkles,
  UploadCloud
} from 'lucide-react';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoModal: React.FC<LogoModalProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'image' | 'crest'>('image');
  const [imageUrl, setImageUrl] = useState(config.brand.logoImageUrl || '');
  const [crestInitials, setCrestInitials] = useState(config.brand.crestInitials || 'PIMS');
  const [selectedIcon, setSelectedIcon] = useState(config.brand.logoIcon || 'HeartPulse');

  if (!isOpen) return null;

  const medicalPresets = [
    {
      name: 'Medical Cross & Caduceus Emblem',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      name: 'Healthcare Shield Badge',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      name: 'Nursing Caduceus Gold Crest',
      url: 'https://6acdd7e87d990bca654343cb.imgix.net/sandbox/ju;h.jpeg?auto=enhance'
    }
  ];

  const handleSaveImageLogo = (urlToSave?: string) => {
    const finalUrl = urlToSave || imageUrl;
    updateConfig(p => ({
      ...p,
      brand: {
        ...p.brand,
        logoType: finalUrl.trim() ? 'image' : 'crest',
        logoImageUrl: finalUrl.trim()
      }
    }));
    onClose();
  };

  const handleSaveCrestLogo = () => {
    updateConfig(p => ({
      ...p,
      brand: {
        ...p.brand,
        logoType: 'crest',
        crestInitials: crestInitials.trim() || 'PIMS',
        logoIcon: selectedIcon
      }
    }));
    onClose();
  };

  const iconOptions = [
    { id: 'HeartPulse', label: 'Heart & Pulse', component: HeartPulse },
    { id: 'GraduationCap', label: 'Academic Cap', component: GraduationCap },
    { id: 'Activity', label: 'Clinical Activity', component: Activity },
    { id: 'Shield', label: 'Medical Shield', component: Shield },
    { id: 'Plus', label: 'Health Cross', component: Plus }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-300">
        
        {/* Modal Header */}
        <div className="bg-[#111827] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-900 flex items-center justify-center font-bold">
              🛡️
            </div>
            <div>
              <h3 className="font-bold text-base">Change Institute Logo</h3>
              <p className="text-xs text-neutral-400">Use a custom logo image or build a medical crest</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-3 px-4 font-bold text-center flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'image'
                ? 'border-neutral-900 text-neutral-900 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Custom Logo Image URL</span>
          </button>

          <button
            onClick={() => setActiveTab('crest')}
            className={`flex-1 py-3 px-4 font-bold text-center flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'crest'
                ? 'border-neutral-900 text-neutral-900 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Built-in Emblem / Crest</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 text-xs text-neutral-700">
          
          {/* TAB 1: CUSTOM IMAGE URL */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="font-bold text-neutral-900 block mb-1">
                  Logo Image URL (PNG, JPG, SVG, WebP)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/your-logo.png"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:border-neutral-900 outline-none text-xs"
                  />
                  {imageUrl && (
                    <button
                      onClick={() => setImageUrl('')}
                      className="px-2 py-2 text-neutral-400 hover:text-red-600 text-xs"
                      title="Clear"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Tip: Transparent PNG images look best. You can upload your institute logo to imgbb.com, imgur.com, or postimages.org and paste the direct link here.
                </p>
              </div>

              {/* Live Preview */}
              {imageUrl && (
                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white border p-1 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                    <img
                      src={imageUrl}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                      onError={() => alert('Failed to load image from that URL. Please verify the URL is a direct image link.')}
                    />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-xs block">Live Preview</span>
                    <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1 mt-0.5">
                      <Check className="w-3.5 h-3.5" /> Valid logo image detected
                    </span>
                  </div>
                </div>
              )}

              {/* Quick Presets */}
              <div className="pt-2 border-t border-neutral-100">
                <span className="font-bold text-neutral-800 text-[11px] block mb-2">
                  Or pick a medical logo preset:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {medicalPresets.map((preset, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setImageUrl(preset.url);
                      }}
                      className="p-2 border rounded-lg hover:border-neutral-900 bg-neutral-50 cursor-pointer flex flex-col items-center text-center gap-1.5 transition-all"
                    >
                      <img src={preset.url} alt={preset.name} className="w-10 h-10 object-contain rounded" />
                      <span className="text-[10px] font-semibold text-neutral-800 line-clamp-1">{preset.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveImageLogo()}
                  className="bg-[#111827] hover:bg-black text-white px-5 py-2 rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Apply Logo Image
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EMBLEM CREST GENERATOR */}
          {activeTab === 'crest' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-900 block mb-1">Crest Initials</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={crestInitials}
                    onChange={e => setCrestInitials(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border rounded-lg font-bold tracking-widest text-center"
                    placeholder="PIMS"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">Max 4-5 letters (e.g. PIMS, PIB)</span>
                </div>

                <div>
                  <label className="font-bold text-neutral-900 block mb-1">Crest Emblem Preview</label>
                  <div className="flex items-center justify-center p-2 bg-neutral-100 rounded-lg">
                    <div 
                      style={{ backgroundColor: config.theme.primaryColor }}
                      className="w-11 h-12 relative flex items-center justify-center rounded-b-xl rounded-t-sm shadow-md border-2 border-amber-400/80"
                    >
                      {selectedIcon === 'HeartPulse' && <HeartPulse className="w-6 h-6 text-amber-300" />}
                      {selectedIcon === 'GraduationCap' && <GraduationCap className="w-6 h-6 text-amber-300" />}
                      {selectedIcon === 'Activity' && <Activity className="w-6 h-6 text-amber-300" />}
                      {selectedIcon === 'Shield' && <Shield className="w-6 h-6 text-amber-300" />}
                      {selectedIcon === 'Plus' && <Plus className="w-6 h-6 text-amber-300" />}
                      <div className="absolute -bottom-1 text-[8px] font-bold text-amber-200">
                        {crestInitials || 'PIMS'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-900 block mb-1">Select Center Emblem Icon</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {iconOptions.map(opt => {
                    const IconComp = opt.component;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedIcon(opt.id)}
                        className={`p-2.5 rounded-lg border flex items-center gap-2 transition-all cursor-pointer text-left ${
                          selectedIcon === opt.id
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-400 text-neutral-800'
                        }`}
                      >
                        <IconComp className="w-4 h-4 shrink-0 text-amber-400" />
                        <span className="text-xs font-semibold">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCrestLogo}
                  className="bg-[#111827] hover:bg-black text-white px-5 py-2 rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Apply Emblem Crest
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
