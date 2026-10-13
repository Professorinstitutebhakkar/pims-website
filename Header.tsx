import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Shield,
  Activity,
  Image as ImageIcon,
  Sliders,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface HeaderProps {
  onOpenEnquiry: () => void;
  onOpenSearch: () => void;
  onOpenTour: () => void;
  onOpenLogoModal: () => void;
  onOpenMenuEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEnquiry,
  onOpenSearch,
  onOpenTour,
  onOpenLogoModal,
  onOpenMenuEditor
}) => {
  const { config, setIsFullCMSOpen } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const primaryColor = config.theme.primaryColor;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveDropdownIndex(null);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAction = (actionType: 'scroll' | 'modal' | 'link', target: string) => {
    setActiveDropdownIndex(null);
    setMobileMenuOpen(false);
    if (actionType === 'modal') {
      if (target === 'enquiry') onOpenEnquiry();
      else if (target === 'tour') onOpenTour();
      else if (target === 'search') onOpenSearch();
      else onOpenEnquiry();
    } else if (actionType === 'link') {
      if (target.startsWith('http')) {
        window.open(target, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = target;
      }
    } else {
      scrollToSection(target);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdownIndex(index);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdownIndex(null);
    }, 150);
  };

  const renderLogoIcon = () => {
    switch (config.brand.logoIcon) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-amber-300" />;
      case 'Shield': return <Shield className="w-6 h-6 text-amber-300" />;
      case 'Activity': return <Activity className="w-6 h-6 text-amber-300" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-6 h-6 text-amber-300" />;
    }
  };

  const menuItems = config.navigation?.menuItems || [];

  return (
    <header className="w-full z-40 sticky top-9 shadow-sm bg-white">
      {/* 1. TOP UTILITY BAR */}
      <div
        style={{ backgroundColor: primaryColor }}
        className="text-white text-[12px] font-sans py-2 px-4 md:px-8 border-b border-black/15 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Contact Info */}
          <div className="flex items-center flex-wrap gap-4 md:gap-6 text-neutral-100">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <EditableText fieldPath="brand.address" defaultValue={config.brand.address} />
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <EditableText fieldPath="brand.phone" defaultValue={config.brand.phone} />
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <EditableText fieldPath="brand.email" defaultValue={config.brand.email} />
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 text-xs">
            {/* Direct Edit Sub Menus Button */}
            <button
              onClick={onOpenMenuEditor}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              title="Click to edit sub menus, dropdown links and add new pages"
            >
              <Layers className="w-3 h-3 text-neutral-950" />
              <span>Edit Sub Menus</span>
            </button>

            {/* Direct Change Logo Action */}
            <button
              onClick={onOpenLogoModal}
              className="bg-white/20 hover:bg-white text-white hover:text-neutral-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              title="Click to change logo image or emblem"
            >
              <ImageIcon className="w-3 h-3 text-amber-300" />
              <span>Change Logo</span>
            </button>

            <button
              onClick={() => setIsFullCMSOpen(true)}
              className="bg-white/20 hover:bg-white text-white hover:text-neutral-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              title="Click to edit site branding and text"
            >
              <Sliders className="w-3 h-3 text-amber-300" />
              <span>Full CMS</span>
            </button>

            <div className="hidden lg:flex items-center gap-4 font-medium text-neutral-200 ml-2">
              <button onClick={() => scrollToSection('portal')} className="hover:text-amber-300 transition-colors">
                <EditableText fieldPath="topBar.portalLabel" defaultValue={config.topBar.portalLabel} />
              </button>
              <span className="opacity-40">•</span>
              <button onClick={() => scrollToSection('careers')} className="hover:text-amber-300 transition-colors">
                <EditableText fieldPath="topBar.careersLabel" defaultValue={config.topBar.careersLabel} />
              </button>
              <span className="opacity-40">•</span>
              <button onClick={() => scrollToSection('alumni')} className="hover:text-amber-300 transition-colors">
                <EditableText fieldPath="topBar.alumniLabel" defaultValue={config.topBar.alumniLabel} />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-white/25 text-neutral-200">
              <a href="#facebook" aria-label="Facebook" className="hover:text-amber-300 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="hover:text-amber-300 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#youtube" aria-label="YouTube" className="hover:text-amber-300 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* School Logo & Dynamic Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Container (Image or Emblem Crest) */}
          {config.brand.logoType === 'image' && config.brand.logoImageUrl ? (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onOpenLogoModal();
              }}
              className="w-12 h-12 relative flex items-center justify-center rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm group-hover:scale-105 transition-transform shrink-0"
              title="Click to change logo"
            >
              <img src={config.brand.logoImageUrl} alt="Logo" className="w-full h-full object-contain p-0.5" />
            </div>
          ) : (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onOpenLogoModal();
              }}
              style={{ backgroundColor: primaryColor }}
              className="w-11 h-12 relative flex items-center justify-center rounded-b-xl rounded-t-sm shadow-md border-2 border-amber-400/80 group-hover:scale-105 transition-transform shrink-0"
              title="Click to change logo"
            >
              {renderLogoIcon()}
              <div className="absolute -bottom-1 text-[8px] font-bold text-amber-200">
                <EditableText fieldPath="brand.crestInitials" defaultValue={config.brand.crestInitials} />
              </div>
            </div>
          )}

          <div>
            <div className="font-serif font-bold text-lg md:text-xl tracking-tight text-neutral-900 leading-tight">
              <EditableText fieldPath="brand.nameLine1" defaultValue={config.brand.nameLine1} />
            </div>
            <div 
              style={{ color: primaryColor }}
              className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.2em] uppercase transition-colors"
            >
              <EditableText fieldPath="brand.nameLine2" defaultValue={config.brand.nameLine2} />
            </div>
            <div className="text-[9px] text-neutral-500 hidden sm:block tracking-wide">
              <EditableText fieldPath="brand.motto" defaultValue={config.brand.motto} />
            </div>
          </div>
        </div>

        {/* Desktop Nav Links with Interactive Dropdown Sub-menus */}
        <nav className="hidden xl:flex items-center gap-2 text-[13px] font-semibold text-neutral-700 tracking-wide">
          {menuItems.map((item, idx) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isDropdownOpen = activeDropdownIndex === idx;

            return (
              <div
                key={item.id || idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleAction(item.actionType, item.target)}
                  className={`px-3 py-2 flex items-center gap-1 rounded-md transition-all font-semibold cursor-pointer ${
                    isDropdownOpen
                      ? 'text-neutral-950 bg-neutral-100/80'
                      : 'hover:text-neutral-950 hover:bg-neutral-50'
                  }`}
                  style={idx === 0 ? { color: primaryColor, fontWeight: 'bold' } : {}}
                >
                  <span>{item.label}</span>
                  {hasSub && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                        isDropdownOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown Menu Popup */}
                {hasSub && isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50 w-64 animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-neutral-200/90 py-2 overflow-hidden ring-1 ring-black/5">
                      <div className="px-3.5 py-1.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          {item.label} Explorer
                        </span>
                        <button
                          onClick={onOpenMenuEditor}
                          className="text-[10px] text-amber-700 hover:text-amber-800 font-bold hover:underline"
                        >
                          Edit Submenu
                        </button>
                      </div>

                      <div className="py-1">
                        {item.subItems!.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleAction(sub.actionType, sub.target)}
                            className="w-full text-left px-3.5 py-2.5 hover:bg-neutral-50 flex items-start gap-2.5 transition-colors group cursor-pointer"
                          >
                            <span 
                              style={{ backgroundColor: primaryColor }} 
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-xs text-neutral-800 group-hover:text-neutral-950 truncate">
                                  {sub.label}
                                </span>
                                {sub.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-mono">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.description && (
                                <p className="text-[11px] text-neutral-500 line-clamp-1 group-hover:text-neutral-600">
                                  {sub.description}
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-700 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-0.5" />
                          </button>
                        ))}
                      </div>

                      <div className="px-3 py-1.5 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                        <button
                          onClick={() => handleAction(item.actionType, item.target)}
                          className="text-neutral-600 hover:text-neutral-900 font-bold flex items-center gap-1"
                        >
                          <span>View All {item.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA & Search Action */}
        <div className="flex items-center gap-2.5">
          {/* Quick Submenu Editor Shortcut Icon */}
          <button
            onClick={onOpenMenuEditor}
            className="hidden lg:flex p-2 text-neutral-600 hover:text-neutral-900 hover:bg-amber-100/70 rounded-full transition-colors cursor-pointer"
            title="Edit navigation sub-menus"
            aria-label="Edit Sub Menus"
          >
            <Layers className="w-4 h-4 text-amber-600" />
          </button>

          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenEnquiry}
            style={{ backgroundColor: primaryColor }}
            className="hidden sm:inline-flex items-center justify-center text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <EditableText fieldPath="navigation.enquireButton" defaultValue={config.navigation.enquireButton} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 text-neutral-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Accordion Sub-menus */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-neutral-100 px-6 py-4 shadow-xl space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Navigation Menu</span>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenMenuEditor(); }}
              className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1"
            >
              <Layers className="w-3 h-3" /> Edit Submenus
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-sm font-semibold text-neutral-800">
            {menuItems.map((item, idx) => {
              const hasSub = item.subItems && item.subItems.length > 0;
              const isExpanded = mobileExpandedIndex === idx;

              return (
                <div key={item.id || idx} className="border-b border-neutral-100 pb-1">
                  <div className="flex items-center justify-between py-1.5">
                    <button
                      onClick={() => handleAction(item.actionType, item.target)}
                      style={idx === 0 ? { color: primaryColor } : {}}
                      className="text-left font-bold hover:text-amber-700 transition-colors"
                    >
                      {item.label}
                    </button>

                    {hasSub && (
                      <button
                        onClick={() => setMobileExpandedIndex(isExpanded ? null : idx)}
                        className="p-1 text-neutral-400 hover:text-neutral-900"
                        aria-label="Toggle sub-menu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu Accordion Items */}
                  {hasSub && isExpanded && (
                    <div className="pl-3 pr-1 py-1 space-y-1.5 bg-neutral-50 rounded-lg my-1">
                      {item.subItems!.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleAction(sub.actionType, sub.target)}
                          className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 rounded text-xs flex items-center justify-between"
                        >
                          <div className="min-w-0">
                            <span className="font-semibold text-neutral-800 block truncate">{sub.label}</span>
                            {sub.description && (
                              <span className="text-[10px] text-neutral-500 block truncate">{sub.description}</span>
                            )}
                          </div>
                          {sub.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-mono ml-2 shrink-0">
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenMenuEditor(); }}
              className="w-full bg-amber-400 text-neutral-950 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>EDIT SUB MENUS</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLogoModal(); }}
              className="w-full bg-neutral-900 text-white py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>CHANGE LOGO</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenEnquiry(); }}
              style={{ backgroundColor: primaryColor }}
              className="w-full text-white py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-center"
            >
              {config.navigation.enquireButton}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
