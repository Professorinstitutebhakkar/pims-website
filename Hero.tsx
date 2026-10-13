import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Globe,
  HeartHandshake,
  Building2,
  Send,
  CheckCircle2,
  Edit2
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface HeroProps {
  onOpenEnquiryModal: () => void;
  onOpenTourModal: () => void;
  onEnquirySuccess: (data: { name: string; grade: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenEnquiryModal,
  onOpenTourModal,
  onEnquirySuccess
}) => {
  const { config, isInlineEditActive, updateField } = useSiteConfig();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    grade: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const primaryColor = config.theme.primaryColor;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onEnquirySuccess({
        name: formData.parentName,
        grade: formData.grade || 'General Admission'
      });
      setTimeout(() => {
        setFormData({ parentName: '', email: '', phone: '', grade: '' });
        setSubmitted(false);
      }, 5000);
    }, 700);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen style={{ color: primaryColor }} className="w-4 h-4" />;
      case 'Award': return <Award style={{ color: primaryColor }} className="w-4 h-4" />;
      case 'Globe': return <Globe style={{ color: primaryColor }} className="w-4 h-4" />;
      case 'HeartHandshake': return <HeartHandshake style={{ color: primaryColor }} className="w-4 h-4" />;
      case 'Building2':
      default:
        return <Building2 style={{ color: primaryColor }} className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-amber-50/20 via-white to-neutral-50 pt-8 pb-14 px-4 md:px-8 overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & BADGES (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-[11px] font-bold tracking-widest uppercase">
              <span style={{ backgroundColor: primaryColor }} className="w-2 h-2 rounded-full" />
              <EditableText fieldPath="hero.eyebrow" defaultValue={config.hero.eyebrow} />
            </div>

            <div className="space-y-1">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
                <EditableText fieldPath="hero.titleLine1" defaultValue={config.hero.titleLine1} />
              </h1>
              <h1 
                style={{ color: primaryColor }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              >
                <EditableText fieldPath="hero.titleLine2" defaultValue={config.hero.titleLine2} />
              </h1>
            </div>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg">
              <EditableText fieldPath="hero.subtitle" defaultValue={config.hero.subtitle} multiline />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenEnquiryModal}
                style={{ backgroundColor: primaryColor }}
                className="text-white px-6 py-3 rounded-md text-xs font-bold tracking-wider uppercase shadow-lg shadow-black/10 transition-all hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <EditableText fieldPath="hero.cta1Text" defaultValue={config.hero.cta1Text} />
              </button>

              <button
                onClick={onOpenTourModal}
                className="border-2 border-neutral-300 hover:border-neutral-900 text-neutral-800 px-5 py-3 rounded-md text-xs font-bold tracking-wider uppercase transition-all bg-white hover:bg-neutral-50 cursor-pointer"
              >
                <EditableText fieldPath="hero.cta2Text" defaultValue={config.hero.cta2Text} />
              </button>
            </div>

            {/* 5 Bottom Feature Badges */}
            <div className="pt-6 border-t border-neutral-200/80">
              <div className="grid grid-cols-5 gap-2 text-center">
                {config.hero.badges.map((b, idx) => (
                  <div key={b.id} className="flex flex-col items-center group cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      {getBadgeIcon(b.icon)}
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-700 leading-tight">
                      <EditableText fieldPath={`hero.badges.${idx}.label`} defaultValue={b.label} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER IMAGE: STUDENTS IN UNIFORM (4 Cols) */}
          <div className="lg:col-span-4 relative flex justify-center items-end self-end">
            <div className="relative w-full max-w-sm lg:max-w-none group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-neutral-100">
                <img
                  src={config.hero.studentImage}
                  alt="Students in School Uniform"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid Book badge */}
                <div 
                  style={{ backgroundColor: primaryColor }}
                  className="absolute bottom-4 left-4 text-white px-3.5 py-2 rounded-lg shadow-lg border border-amber-400/40 flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {config.brand.crestInitials}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-wider leading-none">
                      <EditableText fieldPath="hero.bookBadgeLine1" defaultValue={config.hero.bookBadgeLine1} />
                    </div>
                    <div className="text-[9px] text-amber-200 tracking-wider font-semibold">
                      <EditableText fieldPath="hero.bookBadgeLine2" defaultValue={config.hero.bookBadgeLine2} />
                    </div>
                  </div>
                </div>

                {/* Quick Image URL Change Prompt when in Edit Mode */}
                {isInlineEditActive && (
                  <button
                    onClick={() => {
                      const newUrl = prompt('Enter new Student Image URL:', config.hero.studentImage);
                      if (newUrl) updateField('hero.studentImage', newUrl);
                    }}
                    className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 shadow-md"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Change Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT FLOATING LEAD FORM (3 Cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden transform transition-all hover:shadow-2xl">
              {/* Card Header */}
              <div 
                style={{ backgroundColor: primaryColor }}
                className="p-5 text-white text-center relative overflow-hidden"
              >
                <h3 className="font-serif font-bold text-lg tracking-wide uppercase">
                  <EditableText fieldPath="hero.enquiryCardTitle" defaultValue={config.hero.enquiryCardTitle} />
                </h3>
                <p className="text-[11px] text-white/90 mt-0.5">
                  <EditableText fieldPath="hero.enquiryCardSubtitle" defaultValue={config.hero.enquiryCardSubtitle} />
                </p>
              </div>

              {/* Form Body */}
              <div className="p-5">
                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif font-bold text-neutral-900 text-base">Enquiry Received!</h4>
                    <p className="text-xs text-neutral-600">
                      Our admissions counsellor will call you shortly within 24 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      style={{ color: primaryColor }}
                      className="text-xs font-bold underline pt-2 cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Parent's Name"
                        value={formData.parentName}
                        onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-md border border-neutral-300 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-800"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-md border border-neutral-300 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-800"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-md border border-neutral-300 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-800"
                      />
                    </div>

                    <div>
                      <select
                        value={formData.grade}
                        onChange={e => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 rounded-md border border-neutral-300 outline-none transition-all text-neutral-700 bg-white"
                      >
                        <option value="">Grade Applying For</option>
                        {config.programs.map(p => (
                          <option key={p.id} value={p.stage}>{p.stage}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ backgroundColor: primaryColor }}
                      className="w-full mt-2 text-white py-2.5 rounded-md text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 hover:opacity-95"
                    >
                      {loading ? (
                        <span>PROCESSING...</span>
                      ) : (
                        <>
                          <span>
                            <EditableText fieldPath="hero.enquirySubmitText" defaultValue={config.hero.enquirySubmitText} />
                          </span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
