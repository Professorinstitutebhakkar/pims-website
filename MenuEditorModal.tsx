import React, { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  X,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

interface MenuEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuEditorModal: React.FC<MenuEditorModalProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig } = useSiteConfig();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const menuItems = config.navigation?.menuItems || [];

  const handleUpdateMenuItem = (index: number, updated: any) => {
    const newItems = [...menuItems];
    newItems[index] = { ...newItems[index], ...updated };
    updateConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        menuItems: newItems
      }
    }));
    triggerToast();
  };

  const handleAddMenuItem = () => {
    const newItem = {
      id: `nav-${Date.now()}`,
      label: 'NEW MENU',
      actionType: 'scroll' as const,
      target: 'about',
      subItems: [
        {
          id: `sub-${Date.now()}-1`,
          label: 'Sub Link 1',
          description: 'Description for link 1',
          actionType: 'scroll' as const,
          target: 'about'
        }
      ]
    };
    const newItems = [...menuItems, newItem];
    updateConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        menuItems: newItems
      }
    }));
    setActiveItemIndex(newItems.length - 1);
    triggerToast();
  };

  const handleDeleteMenuItem = (index: number) => {
    if (menuItems.length <= 1) {
      alert('You must keep at least 1 menu item.');
      return;
    }
    const newItems = menuItems.filter((_, i) => i !== index);
    updateConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        menuItems: newItems
      }
    }));
    setActiveItemIndex(Math.max(0, index - 1));
    triggerToast();
  };

  const handleAddSubItem = (itemIndex: number) => {
    const parent = menuItems[itemIndex];
    const newSubItem = {
      id: `sub-${Date.now()}`,
      label: 'New Submenu Item',
      description: 'Quick description for this submenu',
      actionType: 'scroll' as const,
      target: 'academics',
      badge: ''
    };
    const currentSubs = parent.subItems || [];
    handleUpdateMenuItem(itemIndex, {
      subItems: [...currentSubs, newSubItem]
    });
  };

  const handleUpdateSubItem = (itemIndex: number, subIndex: number, updated: any) => {
    const parent = menuItems[itemIndex];
    const newSubs = [...(parent.subItems || [])];
    newSubs[subIndex] = { ...newSubs[subIndex], ...updated };
    handleUpdateMenuItem(itemIndex, { subItems: newSubs });
  };

  const handleDeleteSubItem = (itemIndex: number, subIndex: number) => {
    const parent = menuItems[itemIndex];
    const newSubs = (parent.subItems || []).filter((_, i) => i !== subIndex);
    handleUpdateMenuItem(itemIndex, { subItems: newSubs });
  };

  const triggerToast = () => {
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2000);
  };

  const selectedItem = menuItems[activeItemIndex] || menuItems[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[88vh] flex flex-col overflow-hidden border border-neutral-300">
        
        {/* Modal Top Header */}
        <div className="bg-[#111827] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-900 flex items-center justify-center font-bold text-base shadow-sm">
              <Layers className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                <span>Navigation & Sub-Menus Editor</span>
                {successToast && (
                  <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
                    <Check className="w-3 h-3" /> Saved Live!
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400">
                Add, rename, reorder main menu headers and configure rich dropdown sub-menus
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Workspace: Left menu list, Right submenu editor */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Column: Menu Items */}
          <div className="w-72 bg-neutral-50 border-r border-neutral-200 p-4 flex flex-col shrink-0">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Main Menu Items</span>
              <button
                onClick={handleAddMenuItem}
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3 h-3" /> Add Menu
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {menuItems.map((item, idx) => {
                const subCount = item.subItems ? item.subItems.length : 0;
                const isSelected = idx === activeItemIndex;
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setActiveItemIndex(idx)}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {subCount > 0 ? (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                          isSelected ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {subCount} subs
                        </span>
                      ) : (
                        <span className={`text-[10px] px-1 py-0.5 rounded ${
                          isSelected ? 'text-neutral-400' : 'text-neutral-400'
                        }`}>
                          single
                        </span>
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-200 text-[11px] text-neutral-500">
              💡 Click on any menu item above to configure its name, destination, and dropdown sub-items.
            </div>
          </div>

          {/* Right Column: Selected Menu Item & its Sub-Menus */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-800">
            {selectedItem ? (
              <div className="space-y-6 max-w-2xl">
                
                {/* 1. Main Item Details */}
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-900">
                      Edit Top Menu: <span className="text-amber-600 font-mono">{selectedItem.label}</span>
                    </span>
                    <button
                      onClick={() => handleDeleteMenuItem(activeItemIndex)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Main Menu
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="font-semibold block mb-1">Menu Label / Button Text</label>
                      <input
                        type="text"
                        value={selectedItem.label}
                        onChange={e => handleUpdateMenuItem(activeItemIndex, { label: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 border rounded-md font-bold uppercase tracking-wide bg-white"
                        placeholder="e.g. ACADEMICS"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Click Action</label>
                      <select
                        value={selectedItem.actionType || 'scroll'}
                        onChange={e => handleUpdateMenuItem(activeItemIndex, { actionType: e.target.value as any })}
                        className="w-full px-2.5 py-2 border rounded-md bg-white font-medium"
                      >
                        <option value="scroll">Scroll to Section</option>
                        <option value="modal">Open Popup Form</option>
                        <option value="link">Custom URL</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">
                      Target Destination:
                      <span className="text-neutral-500 font-normal ml-1">
                        {selectedItem.actionType === 'scroll' 
                          ? 'Section ID (e.g. top, about, academics, infrastructure, activities, footer)'
                          : selectedItem.actionType === 'modal'
                          ? 'Modal type (enquiry, tour, search)'
                          : 'URL (e.g. https://...)'}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={selectedItem.target || ''}
                      onChange={e => handleUpdateMenuItem(activeItemIndex, { target: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md font-mono text-xs bg-white"
                      placeholder="e.g. academics"
                    />
                  </div>
                </div>

                {/* 2. Sub-Menus List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">
                        Sub-Menu Items ({selectedItem.subItems?.length || 0})
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        These appear in a dropdown when hovering or clicking "{selectedItem.label}".
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddSubItem(activeItemIndex)}
                      className="bg-neutral-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Sub-Item</span>
                    </button>
                  </div>

                  {(!selectedItem.subItems || selectedItem.subItems.length === 0) ? (
                    <div className="p-8 text-center bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-300 space-y-2">
                      <p className="font-medium text-neutral-600">No sub-menu items currently configured.</p>
                      <p className="text-[11px] text-neutral-400">Click the button below to add dropdown options under {selectedItem.label}.</p>
                      <button
                        onClick={() => handleAddSubItem(activeItemIndex)}
                        className="bg-amber-400 hover:bg-amber-500 text-neutral-950 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 mt-2"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add First Sub-Item</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedItem.subItems.map((sub, sIdx) => (
                        <div
                          key={sub.id || sIdx}
                          className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all shadow-xs space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 flex items-center gap-2">
                              <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                                {sIdx + 1}
                              </span>
                              <span>Submenu #{sIdx + 1}</span>
                            </span>

                            <button
                              onClick={() => handleDeleteSubItem(activeItemIndex, sIdx)}
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                              title="Delete sub-item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-semibold block mb-1">Submenu Title</label>
                              <input
                                type="text"
                                value={sub.label}
                                onChange={e => handleUpdateSubItem(activeItemIndex, sIdx, { label: e.target.value })}
                                className="w-full px-3 py-1.5 border rounded-md font-semibold text-xs"
                                placeholder="e.g. Clinical Nursing Diploma"
                              />
                            </div>

                            <div>
                              <label className="font-semibold block mb-1">Badge (Optional, e.g. NEW, OPEN, 2026)</label>
                              <input
                                type="text"
                                value={sub.badge || ''}
                                onChange={e => handleUpdateSubItem(activeItemIndex, sIdx, { badge: e.target.value.toUpperCase() })}
                                className="w-full px-3 py-1.5 border rounded-md font-mono text-xs uppercase"
                                placeholder="e.g. OPEN"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold block mb-1">Short Description / Subtitle</label>
                            <input
                              type="text"
                              value={sub.description || ''}
                              onChange={e => handleUpdateSubItem(activeItemIndex, sIdx, { description: e.target.value })}
                              className="w-full px-3 py-1.5 border rounded-md text-xs text-neutral-600"
                              placeholder="Brief 1-line explainer for visitors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-semibold block mb-1">Action Type</label>
                              <select
                                value={sub.actionType || 'scroll'}
                                onChange={e => handleUpdateSubItem(activeItemIndex, sIdx, { actionType: e.target.value as any })}
                                className="w-full px-2.5 py-1.5 border rounded-md bg-white text-xs"
                              >
                                <option value="scroll">Scroll to Section</option>
                                <option value="modal">Open Popup Form</option>
                                <option value="link">External / Custom URL</option>
                              </select>
                            </div>

                            <div>
                              <label className="font-semibold block mb-1">Target Section or Form</label>
                              <select
                                value={sub.target || 'about'}
                                onChange={e => handleUpdateSubItem(activeItemIndex, sIdx, { target: e.target.value })}
                                className="w-full px-2.5 py-1.5 border rounded-md bg-white text-xs font-mono"
                              >
                                <option value="top">Header / Top of Page</option>
                                <option value="about">About Section (about)</option>
                                <option value="academics">Academic Programs (academics)</option>
                                <option value="infrastructure">Campus Infrastructure (infrastructure)</option>
                                <option value="activities">Activities & Campus Life (activities)</option>
                                <option value="announcements">Notice Board & Announcements (announcements)</option>
                                <option value="footer">Contact & Campus Map (footer)</option>
                                <option value="enquiry">Admissions Enquiry Modal (enquiry)</option>
                                <option value="tour">Schedule Campus Tour Modal (tour)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-neutral-500">
                Please select a menu item on the left.
              </div>
            )}
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-neutral-100 px-6 py-3 border-t border-neutral-300 flex items-center justify-between text-xs shrink-0">
          <span className="text-neutral-500 font-medium">
            ✅ Sub-menus appear in responsive interactive dropdowns on desktop and accordion drawers on mobile.
          </span>

          <button
            onClick={onClose}
            className="bg-neutral-900 hover:bg-black text-white px-6 py-2 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Done Editing Menus
          </button>
        </div>

      </div>
    </div>
  );
};
