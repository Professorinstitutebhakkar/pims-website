import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface FooterProps {
  onOpenEnquiry: () => void;
  onOpenTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry, onOpenTour }) => {
  const { config, setIsFullCMSOpen } = useSiteConfig();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const primaryDark = config.theme.primaryDark;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer" 
      style={{ backgroundColor: primaryDark }}
      className="w-full text-white pt-14 pb-8 px-4 md:px-8 border-t border-black/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top 6-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {config.brand.logoType === 'image' && config.brand.logoImageUrl ? (
                <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
                  <img src={config.brand.logoImageUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-10 h-11 flex items-center justify-center bg-white/10 rounded-b-lg border-2 border-amber-400 shrink-0">
                  <GraduationCap className="w-6 h-6 text-amber-300" />
                </div>
              )}
              <div>
                <div className="font-serif font-bold text-lg text-white leading-tight">
                  <EditableText fieldPath="brand.nameLine1" defaultValue={config.brand.nameLine1} />
                </div>
                <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-amber-300">
                  <EditableText fieldPath="brand.nameLine2" defaultValue={config.brand.nameLine2} />
                </div>
              </div>
            </div>

            <p className="text-white/80 text-xs leading-relaxed max-w-sm">
              <EditableText fieldPath="footer.aboutText" defaultValue={config.footer.aboutText} multiline />
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1 text-white">
              <a href="#facebook" aria-label="Facebook" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-neutral-900 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-neutral-900 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-neutral-900 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-amber-300 text-xs">
              <EditableText fieldPath="footer.col2Title" defaultValue={config.footer.col2Title} />
            </h4>
            <ul className="space-y-2 text-white/80">
              <li><button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => scrollTo('academics')} className="hover:text-white transition-colors">Academics</button></li>
              <li><button onClick={onOpenEnquiry} className="hover:text-white transition-colors">Admissions</button></li>
              <li><button onClick={() => scrollTo('activities')} className="hover:text-white transition-colors">Campus Life</button></li>
              <li><button onClick={() => setIsFullCMSOpen(true)} className="text-amber-300 hover:underline transition-colors font-bold flex items-center gap-1">
                <Sliders className="w-3 h-3" />
                <span>Open Site CMS Studio</span>
              </button></li>
            </ul>
          </div>

          {/* Col 3: Academics */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-amber-300 text-xs">
              <EditableText fieldPath="footer.col3Title" defaultValue={config.footer.col3Title} />
            </h4>
            <ul className="space-y-2 text-white/80">
              <li><button onClick={() => scrollTo('academics')} className="hover:text-white transition-colors">Curriculum</button></li>
              <li><button onClick={() => scrollTo('announcements')} className="hover:text-white transition-colors">Academic Calendar</button></li>
              <li><button onClick={() => scrollTo('academics')} className="hover:text-white transition-colors">Examination</button></li>
              <li><button onClick={() => scrollTo('infrastructure')} className="hover:text-white transition-colors">Library</button></li>
              <li><button onClick={() => scrollTo('infrastructure')} className="hover:text-white transition-colors">E-Learning Portal</button></li>
            </ul>
          </div>

          {/* Col 4: Admissions */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-amber-300 text-xs">
              <EditableText fieldPath="footer.col4Title" defaultValue={config.footer.col4Title} />
            </h4>
            <ul className="space-y-2 text-white/80">
              <li><button onClick={onOpenEnquiry} className="hover:text-white transition-colors">Admission Process</button></li>
              <li><button onClick={onOpenEnquiry} className="hover:text-white transition-colors">Fee Structure</button></li>
              <li><button onClick={onOpenEnquiry} className="hover:text-white transition-colors">Scholarships</button></li>
              <li><button onClick={onOpenTour} className="hover:text-white transition-colors">Campus Tour</button></li>
              <li><button onClick={onOpenTour} className="hover:text-white transition-colors">Admissions FAQ</button></li>
            </ul>
          </div>

          {/* Col 5: Contact Us & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-amber-300 text-xs">
              <EditableText fieldPath="footer.col5Title" defaultValue={config.footer.col5Title} />
            </h4>
            <div className="space-y-2.5 text-white/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span><EditableText fieldPath="brand.address" defaultValue={config.brand.address} /></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <a href={`tel:${config.brand.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                  <EditableText fieldPath="brand.phone" defaultValue={config.brand.phone} />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <a href={`mailto:${config.brand.email}`} className="hover:underline">
                  <EditableText fieldPath="brand.email" defaultValue={config.brand.email} />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span><EditableText fieldPath="brand.website" defaultValue={config.brand.website} /></span>
              </div>
            </div>

            {/* Newsletter input */}
            <div className="pt-2 border-t border-white/20">
              <h5 className="font-bold text-[11px] text-amber-300 uppercase">
                <EditableText fieldPath="footer.newsletterTitle" defaultValue={config.footer.newsletterTitle} />
              </h5>
              <p className="text-[10px] text-white/80 mt-0.5">
                <EditableText fieldPath="footer.newsletterDesc" defaultValue={config.footer.newsletterDesc} />
              </p>
              
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-green-300 text-xs mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-2 flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder:text-white/50 text-xs px-3 py-1.5 rounded-l border border-white/20 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-r border border-l-0 border-white/20 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div>
            <EditableText fieldPath="footer.copyrightText" defaultValue={config.footer.copyrightText} />
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
