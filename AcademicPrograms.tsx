import React from 'react';
import {
  Baby,
  BookOpen,
  GraduationCap,
  Library,
  Briefcase,
  ArrowRight,
  Edit2
} from 'lucide-react';
import { useSiteConfig, AcademicProgramItem } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface AcademicProgramsProps {
  onSelectProgram: (program: AcademicProgramItem) => void;
}

export const AcademicPrograms: React.FC<AcademicProgramsProps> = ({ onSelectProgram }) => {
  const { config, isInlineEditActive, updateField } = useSiteConfig();
  const primaryColor = config.theme.primaryColor;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby': return <Baby className="w-5 h-5 text-white" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-white" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-white" />;
      case 'Library': return <Library className="w-5 h-5 text-white" />;
      case 'Briefcase':
      default:
        return <Briefcase className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="academics" className="w-full py-16 px-4 md:px-8 bg-neutral-50/70 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span 
            style={{ color: primaryColor }}
            className="text-xs font-bold uppercase tracking-widest block"
          >
            <EditableText fieldPath="programsHeading.kicker" defaultValue={config.programsHeading.kicker} />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">
            <EditableText fieldPath="programsHeading.headline" defaultValue={config.programsHeading.headline} />
          </h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {config.programs.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-neutral-200/80 overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Circular Badge floating over image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={prog.image}
                  alt={prog.stage}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Maroon Circular Icon Badge */}
                <div 
                  style={{ backgroundColor: primaryColor }}
                  className="absolute -bottom-4 left-4 w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                >
                  {getIcon(prog.iconName)}
                </div>

                {isInlineEditActive && (
                  <button
                    onClick={() => {
                      const newUrl = prompt(`Enter Image URL for ${prog.stage}:`, prog.image);
                      if (newUrl) updateField(`programs.${idx}.image`, newUrl);
                    }}
                    className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-md"
                  >
                    <Edit2 className="w-2.5 h-2.5 text-amber-400" />
                    <span>Img</span>
                  </button>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 pt-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-neutral-900 transition-colors">
                    <EditableText fieldPath={`programs.${idx}.stage`} defaultValue={prog.stage} />
                  </h3>
                  
                  {/* Tagline */}
                  <div 
                    style={{ color: primaryColor }}
                    className="text-[11px] font-bold mt-0.5 tracking-wide"
                  >
                    <EditableText fieldPath={`programs.${idx}.tagline`} defaultValue={prog.tagline} />
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    <EditableText fieldPath={`programs.${idx}.description`} defaultValue={prog.description} multiline />
                  </p>
                </div>

                {/* Read More Button */}
                <div className="pt-4 mt-2 border-t border-neutral-100">
                  <button
                    onClick={() => onSelectProgram(prog)}
                    style={{ color: primaryColor }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>READ MORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
