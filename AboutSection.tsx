import React from 'react';
import {
  Award,
  Users,
  GraduationCap,
  UserCheck,
  Trophy,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface AboutSectionProps {
  onOpenTour: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenTour }) => {
  const { config, isInlineEditActive, updateField } = useSiteConfig();
  const primaryColor = config.theme.primaryColor;

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award style={{ color: primaryColor }} className="w-5 h-5" />;
      case 'Users': return <Users style={{ color: primaryColor }} className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap style={{ color: primaryColor }} className="w-5 h-5" />;
      case 'UserCheck': return <UserCheck style={{ color: primaryColor }} className="w-5 h-5" />;
      case 'Trophy': return <Trophy style={{ color: primaryColor }} className="w-5 h-5" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck style={{ color: primaryColor }} className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="w-full py-16 px-4 md:px-8 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: GRAND CAMPUS ARCHITECTURE IMAGE (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-neutral-100 aspect-[4/3]">
                <img
                  src={config.about.campusImage}
                  alt="School Campus Building"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {isInlineEditActive && (
                  <button
                    onClick={() => {
                      const newUrl = prompt('Enter new Campus Image URL:', config.about.campusImage);
                      if (newUrl) updateField('about.campusImage', newUrl);
                    }}
                    className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 shadow-md"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Change Image</span>
                  </button>
                )}
              </div>

              {/* Overlaid Pill Badge */}
              <div 
                style={{ backgroundColor: primaryColor }}
                className="absolute -bottom-4 left-6 text-white px-4 py-2 rounded-full shadow-lg border border-amber-300/40 text-xs font-bold tracking-wider uppercase flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <EditableText fieldPath="brand.badgeText" defaultValue={config.brand.badgeText} />
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT & 2x3 STATS GRID (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span 
                style={{ color: primaryColor }}
                className="text-xs font-bold uppercase tracking-widest block"
              >
                <EditableText fieldPath="about.kicker" defaultValue={config.about.kicker} />
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
                <EditableText fieldPath="about.headline" defaultValue={config.about.headline} />
              </h2>
            </div>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              <EditableText fieldPath="about.description" defaultValue={config.about.description} multiline />
            </p>

            <div>
              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-2 border-2 border-neutral-800 text-neutral-800 hover:border-neutral-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
              >
                <span>
                  <EditableText fieldPath="about.buttonText" defaultValue={config.about.buttonText} />
                </span>
              </button>
            </div>

            {/* 2x3 STATS GRID MATCHING REFERENCE */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-neutral-100">
              {config.about.stats.map((st, idx) => (
                <div key={st.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    {getStatIcon(st.icon)}
                  </div>
                  <div>
                    <div className="font-serif text-xl font-bold text-neutral-900 leading-none">
                      <EditableText fieldPath={`about.stats.${idx}.val`} defaultValue={st.val} />
                    </div>
                    <div className="text-xs text-neutral-500 font-medium mt-1">
                      <EditableText fieldPath={`about.stats.${idx}.label`} defaultValue={st.label} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
