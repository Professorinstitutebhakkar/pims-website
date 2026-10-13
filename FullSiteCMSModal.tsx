import React, { useState } from 'react';
import { useSiteConfig, FullSiteConfig } from '../context/SiteConfigContext';
import {
  X,
  Sparkles,
  Palette,
  Type,
  Building,
  BarChart3,
  BookOpen,
  Image,
  MessageSquare,
  Bell,
  Calendar,
  Compass,
  Check,
  Copy,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  Layers
} from 'lucide-react';

export const FullSiteCMSModal: React.FC = () => {
  const { config, updateConfig, resetConfig, isFullCMSOpen, setIsFullCMSOpen } = useSiteConfig();
  const [activeSection, setActiveSection] = useState<
    'brand' | 'navigation' | 'hero' | 'about' | 'programs' | 'facilities' | 'activities' | 'testimonials' | 'announcements' | 'footer' | 'theme' | 'json'
  >('brand');
  const [copiedJson, setCopiedJson] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  if (!isFullCMSOpen) return null;

  const sectionsList = [
    { id: 'brand', label: '1. Brand & Contacts', icon: Building },
    { id: 'navigation', label: '2. Menus & Sub-Menus', icon: Layers },
    { id: 'hero', label: '3. Hero & Lead Form', icon: Type },
    { id: 'about', label: '4. About & 6 Stats', icon: BarChart3 },
    { id: 'programs', label: '5. Academic Stages (5)', icon: BookOpen },
    { id: 'facilities', label: '6. Facilities Banner', icon: Layers },
    { id: 'activities', label: '7. Activities (6 Cards)', icon: Compass },
    { id: 'testimonials', label: '8. Parent Testimonials', icon: MessageSquare },
    { id: 'announcements', label: '9. Announcements & Dates', icon: Bell },
    { id: 'footer', label: '10. Footer & Legal', icon: Calendar },
    { id: 'theme', label: '11. Theme Colors', icon: Palette },
    { id: 'json', label: '💾 Export / Import Site', icon: Download }
  ];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleImportJson = () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(jsonInput);
      if (!parsed.brand || !parsed.hero) {
        throw new Error('Invalid site configuration format.');
      }
      updateConfig(parsed);
      alert('Site configuration loaded successfully!');
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  const loadProfessorsPreset = () => {
    updateConfig(prev => ({
      ...prev,
      brand: {
        nameLine1: "PROFESSOR'S",
        nameLine2: 'INSTITUTE BHAKKAR',
        motto: 'Igniting Intellect. Inspiring Academic Eminence.',
        address: 'Main Campus Road, Bhakkar, Punjab, Pakistan',
        phone: '+92 300 1234567',
        email: 'professorsinstitutebhakkar@gmail.com',
        website: 'www.professorsinstitute.edu.pk',
        badgeText: 'ESTABLISHED 2012 • BHAKKAR',
        crestInitials: 'PIB'
      },
      hero: {
        ...prev.hero,
        eyebrow: 'WHERE FUTURE DOCTORS & ENGINEERS ARE SHAPED',
        titleLine1: 'Learn. Lead.',
        titleLine2: 'Excel.',
        subtitle: 'Comprehensive Matric, FSc Pre-Medical, Pre-Engineering & ICS coaching with Punjab’s most renowned subject specialists.',
        cta1Text: 'ADMISSIONS OPEN 2025–26',
        cta2Text: 'VISIT BHAKKAR CAMPUS',
        bookBadgeLine1: 'PROFESSOR’S',
        bookBadgeLine2: 'INSTITUTE'
      },
      about: {
        ...prev.about,
        kicker: "WELCOME TO PROFESSOR'S INSTITUTE",
        headline: 'Guaranteed Conceptual Mastery for Board Distinction',
        description: "At Professor's Institute Bhakkar, we focus on rigorous test systems, individual mentoring, and thorough exam preparation to secure top board positions every single year.",
        stats: [
          { id: 's1', val: '12+', label: 'Years in Bhakkar', icon: 'Award' },
          { id: 's2', val: '45+', label: 'Expert Professors', icon: 'Users' },
          { id: 's3', val: '1800+', label: 'Successful Scholars', icon: 'GraduationCap' },
          { id: 's4', val: '15:1', label: 'Student-Teacher Ratio', icon: 'UserCheck' },
          { id: 's5', val: '98%', label: 'Board Pass Rate', icon: 'Trophy' },
          { id: 's6', val: '100%', label: 'Disciplined Campus', icon: 'ShieldCheck' }
        ]
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden border border-neutral-300">
        
        {/* Modal Top Header */}
        <div className="bg-[#111827] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-900 flex items-center justify-center font-bold text-lg shadow-sm">
              ⚙️
            </div>
            <div>
              <h2 className="font-bold text-base">Full-Site CMS Studio</h2>
              <p className="text-xs text-neutral-400">Edit every headline, paragraph, card, counter, contact & image</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadProfessorsPreset}
              className="hidden sm:inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Professor's Institute</span>
            </button>

            <button
              onClick={() => setIsFullCMSOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Body: Left Sidebar + Right Form Workspace */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Navigation Tabs */}
          <div className="w-60 bg-neutral-50 border-r border-neutral-200 p-3 space-y-1 overflow-y-auto shrink-0 text-xs">
            {sectionsList.map(sec => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id as any)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-700 hover:bg-neutral-200/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Editing Workspace */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-800">

            {/* 1. BRAND & CONTACTS */}
            {activeSection === 'brand' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">1. Institution Brand & Contact Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">School Name (Top Line)</label>
                    <input
                      type="text"
                      value={config.brand.nameLine1}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, nameLine1: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">School Subtitle (Line 2)</label>
                    <input
                      type="text"
                      value={config.brand.nameLine2}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, nameLine2: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">School Motto / Tagline</label>
                  <input
                    type="text"
                    value={config.brand.motto}
                    onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, motto: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">Crest Emblem Initials</label>
                    <input
                      type="text"
                      value={config.brand.crestInitials}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, crestInitials: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Campus Founding Badge</label>
                    <input
                      type="text"
                      value={config.brand.badgeText}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, badgeText: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* LOGO CONFIGURATION BOX */}
                <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-xs">Institute Logo Mode</span>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase">Image or Emblem</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Logo Type</label>
                      <select
                        value={config.brand.logoType || 'crest'}
                        onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, logoType: e.target.value as any } }))}
                        className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                      >
                        <option value="crest">Built-in Medical/Academic Crest</option>
                        <option value="image">Custom Logo Image URL</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Emblem Center Icon</label>
                      <select
                        value={config.brand.logoIcon || 'HeartPulse'}
                        onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, logoIcon: e.target.value } }))}
                        className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                      >
                        <option value="HeartPulse">Heart & Medical Pulse</option>
                        <option value="GraduationCap">Graduation Cap</option>
                        <option value="Shield">Medical Shield</option>
                        <option value="Activity">Clinical Activity</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Custom Logo Image URL (PNG / JPG / WebP)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/your-logo.png"
                      value={config.brand.logoImageUrl || ''}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, logoImageUrl: e.target.value, logoType: e.target.value ? 'image' : p.brand.logoType } }))}
                      className="w-full px-3 py-2 border rounded bg-white font-mono text-xs"
                    />
                    {config.brand.logoImageUrl && (
                      <div className="mt-2 flex items-center gap-3 p-2 bg-white rounded border">
                        <img src={config.brand.logoImageUrl} alt="Logo" className="w-10 h-10 object-contain rounded" />
                        <span className="text-[11px] text-green-700 font-semibold">Active custom logo image preview</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={config.brand.phone}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, phone: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Official Email Address</label>
                    <input
                      type="email"
                      value={config.brand.email}
                      onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, email: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Physical Campus Address</label>
                  <textarea
                    rows={2}
                    value={config.brand.address}
                    onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, address: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Official Website URL</label>
                  <input
                    type="text"
                    value={config.brand.website}
                    onChange={e => updateConfig(p => ({ ...p, brand: { ...p.brand, website: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {/* 2. MENUS & SUB-MENUS */}
            {activeSection === 'navigation' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">2. Navigation Menus & Dropdown Sub-Menus</h3>
                    <p className="text-xs text-neutral-500">Manage header links, action targets, and rich dropdown sub-items.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newNav = [...(config.navigation?.menuItems || [])];
                      newNav.push({
                        id: `nav-${Date.now()}`,
                        label: 'NEW MENU',
                        actionType: 'scroll',
                        target: 'about',
                        subItems: [
                          {
                            id: `sub-${Date.now()}`,
                            label: 'Overview',
                            description: 'Quick link description',
                            actionType: 'scroll',
                            target: 'about'
                          }
                        ]
                      });
                      updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                    }}
                    className="bg-amber-400 hover:bg-amber-500 text-neutral-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Top Menu Item</span>
                  </button>
                </div>

                {/* List of Main Menus with their sub-menus */}
                <div className="space-y-4">
                  {(config.navigation?.menuItems || []).map((menu, mIdx) => (
                    <div key={menu.id || mIdx} className="p-4 rounded-xl border border-neutral-300 bg-neutral-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 text-xs flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                            {mIdx + 1}
                          </span>
                          <span>Menu Header: {menu.label}</span>
                        </span>
                        <button
                          onClick={() => {
                            const newNav = (config.navigation?.menuItems || []).filter((_, i) => i !== mIdx);
                            updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Menu
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="font-semibold block mb-1">Menu Label</label>
                          <input
                            type="text"
                            value={menu.label}
                            onChange={e => {
                              const newNav = [...(config.navigation?.menuItems || [])];
                              newNav[mIdx] = { ...newNav[mIdx], label: e.target.value.toUpperCase() };
                              updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                            }}
                            className="w-full px-3 py-1.5 border rounded-md font-bold uppercase bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Click Action</label>
                          <select
                            value={menu.actionType || 'scroll'}
                            onChange={e => {
                              const newNav = [...(config.navigation?.menuItems || [])];
                              newNav[mIdx] = { ...newNav[mIdx], actionType: e.target.value as any };
                              updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                            }}
                            className="w-full px-2.5 py-1.5 border rounded-md bg-white text-xs"
                          >
                            <option value="scroll">Scroll to Section</option>
                            <option value="modal">Open Popup Form</option>
                            <option value="link">Custom URL</option>
                          </select>
                        </div>
                      </div>

                      {/* Sub-menus for this menu */}
                      <div className="pt-2 border-t border-neutral-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-700 text-[11px]">
                            Dropdown Sub-Items ({menu.subItems?.length || 0})
                          </span>
                          <button
                            onClick={() => {
                              const newNav = [...(config.navigation?.menuItems || [])];
                              const currentSubs = newNav[mIdx].subItems || [];
                              currentSubs.push({
                                id: `sub-${Date.now()}`,
                                label: 'New Submenu Item',
                                description: 'Description',
                                actionType: 'scroll',
                                target: 'about'
                              });
                              newNav[mIdx] = { ...newNav[mIdx], subItems: currentSubs };
                              updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                            }}
                            className="text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Sub-Item
                          </button>
                        </div>

                        {(menu.subItems || []).map((sub, sIdx) => (
                          <div key={sub.id || sIdx} className="p-2.5 rounded-lg border border-neutral-200 bg-white grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs">
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                value={sub.label}
                                placeholder="Submenu Title"
                                onChange={e => {
                                  const newNav = [...(config.navigation?.menuItems || [])];
                                  const subs = [...(newNav[mIdx].subItems || [])];
                                  subs[sIdx] = { ...subs[sIdx], label: e.target.value };
                                  newNav[mIdx] = { ...newNav[mIdx], subItems: subs };
                                  updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                                }}
                                className="w-full px-2 py-1 border rounded text-xs font-semibold"
                              />
                              <input
                                type="text"
                                value={sub.description || ''}
                                placeholder="Short description"
                                onChange={e => {
                                  const newNav = [...(config.navigation?.menuItems || [])];
                                  const subs = [...(newNav[mIdx].subItems || [])];
                                  subs[sIdx] = { ...subs[sIdx], description: e.target.value };
                                  newNav[mIdx] = { ...newNav[mIdx], subItems: subs };
                                  updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                                }}
                                className="w-full px-2 py-1 border rounded text-[11px] text-neutral-500 mt-1"
                              />
                            </div>
                            <div>
                              <select
                                value={sub.target || 'about'}
                                onChange={e => {
                                  const newNav = [...(config.navigation?.menuItems || [])];
                                  const subs = [...(newNav[mIdx].subItems || [])];
                                  subs[sIdx] = { ...subs[sIdx], target: e.target.value };
                                  newNav[mIdx] = { ...newNav[mIdx], subItems: subs };
                                  updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                                }}
                                className="w-full px-2 py-1 border rounded text-xs bg-white font-mono"
                              >
                                <option value="top">Header (top)</option>
                                <option value="about">About (about)</option>
                                <option value="academics">Programs (academics)</option>
                                <option value="infrastructure">Campus (infrastructure)</option>
                                <option value="activities">Activities (activities)</option>
                                <option value="announcements">Notices (announcements)</option>
                                <option value="footer">Contact (footer)</option>
                                <option value="enquiry">Enquiry Form</option>
                                <option value="tour">Tour Booking</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-end">
                              <button
                                onClick={() => {
                                  const newNav = [...(config.navigation?.menuItems || [])];
                                  const subs = (newNav[mIdx].subItems || []).filter((_, i) => i !== sIdx);
                                  newNav[mIdx] = { ...newNav[mIdx], subItems: subs };
                                  updateConfig(p => ({ ...p, navigation: { ...p.navigation, menuItems: newNav } }));
                                }}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Remove sub-item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. HERO & LEAD FORM */}
            {activeSection === 'hero' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">3. Hero Section & Enquiry Card</h3>

                <div>
                  <label className="font-semibold block mb-1">Eyebrow Kicker</label>
                  <input
                    type="text"
                    value={config.hero.eyebrow}
                    onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, eyebrow: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">Main Heading 1</label>
                    <input
                      type="text"
                      value={config.hero.titleLine1}
                      onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, titleLine1: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Main Heading 2 (Accent Color)</label>
                    <input
                      type="text"
                      value={config.hero.titleLine2}
                      onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, titleLine2: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={config.hero.subtitle}
                    onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, subtitle: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold block mb-1">CTA Button 1 Label</label>
                    <input
                      type="text"
                      value={config.hero.cta1Text}
                      onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, cta1Text: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">CTA Button 2 Label</label>
                    <input
                      type="text"
                      value={config.hero.cta2Text}
                      onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, cta2Text: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Student Hero Photo URL</label>
                  <input
                    type="text"
                    value={config.hero.studentImage}
                    onChange={e => updateConfig(p => ({ ...p, hero: { ...p.hero, studentImage: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <img src={config.hero.studentImage} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                    <span className="text-[11px] text-neutral-500">Live preview of student image</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-bold mb-2">5 Hero Feature Badges</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {config.hero.badges.map((b, idx) => (
                      <div key={b.id} className="flex items-center gap-2 p-2 border rounded bg-neutral-50">
                        <span className="text-neutral-500 font-bold">{idx + 1}.</span>
                        <input
                          type="text"
                          value={b.label}
                          onChange={e => {
                            const newBadges = [...config.hero.badges];
                            newBadges[idx].label = e.target.value;
                            updateConfig(p => ({ ...p, hero: { ...p.hero, badges: newBadges } }));
                          }}
                          className="w-full px-2 py-1 border rounded text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. ABOUT & 6 STATS */}
            {activeSection === 'about' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">3. About Section & 6 Key Stats</h3>

                <div>
                  <label className="font-semibold block mb-1">Section Kicker</label>
                  <input
                    type="text"
                    value={config.about.kicker}
                    onChange={e => updateConfig(p => ({ ...p, about: { ...p.about, kicker: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Main Heading</label>
                  <input
                    type="text"
                    value={config.about.headline}
                    onChange={e => updateConfig(p => ({ ...p, about: { ...p.about, headline: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={config.about.description}
                    onChange={e => updateConfig(p => ({ ...p, about: { ...p.about, description: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Campus Architecture Photo URL</label>
                  <input
                    type="text"
                    value={config.about.campusImage}
                    onChange={e => updateConfig(p => ({ ...p, about: { ...p.about, campusImage: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-bold mb-3">6 Statistics Counters (2x3 Grid)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {config.about.stats.map((st, idx) => (
                      <div key={st.id} className="p-3 border rounded-lg bg-neutral-50 space-y-1.5">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase">Stat #{idx + 1}</span>
                        <input
                          type="text"
                          placeholder="Value (e.g. 20+)"
                          value={st.val}
                          onChange={e => {
                            const newStats = [...config.about.stats];
                            newStats[idx].val = e.target.value;
                            updateConfig(p => ({ ...p, about: { ...p.about, stats: newStats } }));
                          }}
                          className="w-full px-2 py-1 border rounded bg-white font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Label (e.g. Years of Excellence)"
                          value={st.label}
                          onChange={e => {
                            const newStats = [...config.about.stats];
                            newStats[idx].label = e.target.value;
                            updateConfig(p => ({ ...p, about: { ...p.about, stats: newStats } }));
                          }}
                          className="w-full px-2 py-1 border rounded bg-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. ACADEMIC PROGRAMS */}
            {activeSection === 'programs' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">4. Academic Programs (5 Stages)</h3>

                <div className="space-y-4">
                  {config.programs.map((prog, idx) => (
                    <div key={prog.id} className="p-4 border rounded-xl bg-neutral-50 space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-bold text-sm text-neutral-800">Stage {idx + 1}: {prog.stage}</span>
                        <span className="text-[10px] bg-neutral-200 px-2 py-0.5 rounded font-mono">{prog.id}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="font-semibold block mb-1">Stage Name</label>
                          <input
                            type="text"
                            value={prog.stage}
                            onChange={e => {
                              const newProgs = [...config.programs];
                              newProgs[idx].stage = e.target.value;
                              updateConfig(p => ({ ...p, programs: newProgs }));
                            }}
                            className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Tagline</label>
                          <input
                            type="text"
                            value={prog.tagline}
                            onChange={e => {
                              const newProgs = [...config.programs];
                              newProgs[idx].tagline = e.target.value;
                              updateConfig(p => ({ ...p, programs: newProgs }));
                            }}
                            className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Grade Span</label>
                          <input
                            type="text"
                            value={prog.gradeSpan}
                            onChange={e => {
                              const newProgs = [...config.programs];
                              newProgs[idx].gradeSpan = e.target.value;
                              updateConfig(p => ({ ...p, programs: newProgs }));
                            }}
                            className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={prog.description}
                          onChange={e => {
                            const newProgs = [...config.programs];
                            newProgs[idx].description = e.target.value;
                            updateConfig(p => ({ ...p, programs: newProgs }));
                          }}
                          className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={prog.image}
                          onChange={e => {
                            const newProgs = [...config.programs];
                            newProgs[idx].image = e.target.value;
                            updateConfig(p => ({ ...p, programs: newProgs }));
                          }}
                          className="w-full px-2.5 py-1.5 border rounded bg-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FACILITIES BANNER */}
            {activeSection === 'facilities' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">5. Campus Infrastructure Banner (5 Stats)</h3>
                
                <div className="space-y-3">
                  {config.facilities.map((fac, idx) => (
                    <div key={fac.id} className="p-3 border rounded-lg bg-neutral-50 flex items-center gap-3">
                      <span className="font-bold text-neutral-500">{idx + 1}.</span>
                      <input
                        type="text"
                        placeholder="Value (e.g. 10+)"
                        value={fac.val}
                        onChange={e => {
                          const newF = [...config.facilities];
                          newF[idx].val = e.target.value;
                          updateConfig(p => ({ ...p, facilities: newF }));
                        }}
                        className="w-24 px-2 py-1.5 border rounded bg-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Acres Campus)"
                        value={fac.label}
                        onChange={e => {
                          const newF = [...config.facilities];
                          newF[idx].label = e.target.value;
                          updateConfig(p => ({ ...p, facilities: newF }));
                        }}
                        className="flex-1 px-2.5 py-1.5 border rounded bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. ACTIVITIES */}
            {activeSection === 'activities' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">6. Beyond Classrooms Activities (6 Cards)</h3>

                <div className="grid grid-cols-2 gap-4">
                  {config.activities.map((act, idx) => (
                    <div key={act.id} className="p-3 border rounded-lg bg-neutral-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">Card #{idx + 1}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{act.category}</span>
                      </div>
                      <input
                        type="text"
                        value={act.title}
                        onChange={e => {
                          const newActs = [...config.activities];
                          newActs[idx].title = e.target.value;
                          updateConfig(p => ({ ...p, activities: newActs }));
                        }}
                        className="w-full px-2 py-1 border rounded bg-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Tagline"
                        value={act.tagline}
                        onChange={e => {
                          const newActs = [...config.activities];
                          newActs[idx].tagline = e.target.value;
                          updateConfig(p => ({ ...p, activities: newActs }));
                        }}
                        className="w-full px-2 py-1 border rounded bg-white text-[11px]"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={act.image}
                        onChange={e => {
                          const newActs = [...config.activities];
                          newActs[idx].image = e.target.value;
                          updateConfig(p => ({ ...p, activities: newActs }));
                        }}
                        className="w-full px-2 py-1 border rounded bg-white text-[10px] font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PARENT TESTIMONIALS */}
            {activeSection === 'testimonials' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">7. What Parents Say (Testimonials)</h3>

                <div className="space-y-4">
                  {config.testimonials.map((test, idx) => (
                    <div key={test.id} className="p-3 border rounded-lg bg-neutral-50 space-y-2">
                      <div className="flex items-center justify-between font-bold">
                        <span>Review #{idx + 1}</span>
                      </div>
                      <textarea
                        rows={2}
                        value={test.quote}
                        onChange={e => {
                          const newT = [...config.testimonials];
                          newT[idx].quote = e.target.value;
                          updateConfig(p => ({ ...p, testimonials: newT }));
                        }}
                        className="w-full px-2.5 py-1.5 border rounded bg-white text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Parent Name"
                          value={test.parentName}
                          onChange={e => {
                            const newT = [...config.testimonials];
                            newT[idx].parentName = e.target.value;
                            updateConfig(p => ({ ...p, testimonials: newT }));
                          }}
                          className="w-full px-2 py-1 border rounded bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Student Grade"
                          value={test.role}
                          onChange={e => {
                            const newT = [...config.testimonials];
                            newT[idx].role = e.target.value;
                            updateConfig(p => ({ ...p, testimonials: newT }));
                          }}
                          className="w-full px-2 py-1 border rounded bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. ANNOUNCEMENTS */}
            {activeSection === 'announcements' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">8. Latest Announcements & Events</h3>

                <div className="space-y-3">
                  {config.announcements.map((ann, idx) => (
                    <div key={ann.id} className="p-3 border rounded-lg bg-neutral-50 flex items-start gap-3">
                      <div className="w-16 space-y-1">
                        <input
                          type="text"
                          placeholder="MONTH"
                          value={ann.month}
                          onChange={e => {
                            const newA = [...config.announcements];
                            newA[idx].month = e.target.value;
                            updateConfig(p => ({ ...p, announcements: newA }));
                          }}
                          className="w-full px-1 py-0.5 border rounded bg-white text-center font-bold text-xs"
                        />
                        <input
                          type="text"
                          placeholder="DAY"
                          value={ann.day}
                          onChange={e => {
                            const newA = [...config.announcements];
                            newA[idx].day = e.target.value;
                            updateConfig(p => ({ ...p, announcements: newA }));
                          }}
                          className="w-full px-1 py-0.5 border rounded bg-white text-center font-bold text-sm"
                        />
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          placeholder="Announcement Title"
                          value={ann.title}
                          onChange={e => {
                            const newA = [...config.announcements];
                            newA[idx].title = e.target.value;
                            updateConfig(p => ({ ...p, announcements: newA }));
                          }}
                          className="w-full px-2.5 py-1.5 border rounded bg-white font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Details"
                          value={ann.description}
                          onChange={e => {
                            const newA = [...config.announcements];
                            newA[idx].description = e.target.value;
                            updateConfig(p => ({ ...p, announcements: newA }));
                          }}
                          className="w-full px-2.5 py-1 border rounded bg-white text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. FOOTER & LEGAL */}
            {activeSection === 'footer' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">9. Footer & Copyright Details</h3>

                <div>
                  <label className="font-semibold block mb-1">Footer Brand Statement</label>
                  <textarea
                    rows={2}
                    value={config.footer.aboutText}
                    onChange={e => updateConfig(p => ({ ...p, footer: { ...p.footer, aboutText: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Copyright Line</label>
                  <input
                    type="text"
                    value={config.footer.copyrightText}
                    onChange={e => updateConfig(p => ({ ...p, footer: { ...p.footer, copyrightText: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {/* 10. THEME COLORS */}
            {activeSection === 'theme' && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">10. Theme Colors & Styling</h3>

                <div className="space-y-3">
                  <div>
                    <label className="font-semibold block mb-1">Primary Color (Crimson / Navy / Emerald)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme.primaryColor}
                        onChange={e => updateConfig(p => ({ ...p, theme: { ...p.theme, primaryColor: e.target.value } }))}
                        className="w-12 h-10 rounded border cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={config.theme.primaryColor}
                        onChange={e => updateConfig(p => ({ ...p, theme: { ...p.theme, primaryColor: e.target.value } }))}
                        className="w-32 px-2.5 py-1.5 border rounded font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Dark Footer Background Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme.primaryDark}
                        onChange={e => updateConfig(p => ({ ...p, theme: { ...p.theme, primaryDark: e.target.value } }))}
                        className="w-12 h-10 rounded border cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={config.theme.primaryDark}
                        onChange={e => updateConfig(p => ({ ...p, theme: { ...p.theme, primaryDark: e.target.value } }))}
                        className="w-32 px-2.5 py-1.5 border rounded font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 11. EXPORT / IMPORT JSON */}
            {activeSection === 'json' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-neutral-900 border-b pb-2">💾 Export & Backup Full Site Configuration</h3>

                <p className="text-neutral-600">
                  You can copy the entire site database JSON below to keep a backup, share it, or send it to us so we can hardcode your exact details into the source code!
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="bg-[#111827] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-black transition-colors cursor-pointer"
                  >
                    {copiedJson ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedJson ? 'Copied Full JSON!' : 'Copy Full Site JSON'}</span>
                  </button>

                  <button
                    onClick={resetConfig}
                    className="text-red-700 hover:text-red-800 border border-red-300 px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Everything to Default</span>
                  </button>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-bold text-neutral-900">Import Site JSON</h4>
                  <textarea
                    rows={6}
                    placeholder="Paste previously copied site JSON here..."
                    value={jsonInput}
                    onChange={e => setJsonInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md font-mono text-[11px]"
                  />
                  {jsonError && <p className="text-red-600 text-xs">{jsonError}</p>}
                  <button
                    onClick={handleImportJson}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-800 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Apply Imported JSON</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-neutral-100 px-6 py-3 border-t border-neutral-300 flex items-center justify-between text-xs shrink-0">
          <span className="text-neutral-500 font-medium">
            ✅ All edits update live in real-time and save to your browser's local memory.
          </span>

          <button
            onClick={() => setIsFullCMSOpen(false)}
            className="bg-neutral-900 hover:bg-black text-white px-6 py-2 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
};
