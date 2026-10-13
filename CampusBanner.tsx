import React from 'react';
import {
  Building2,
  Backpack,
  FlaskConical,
  Music,
  Presentation
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

export const CampusBanner: React.FC = () => {
  const { config } = useSiteConfig();
  const primaryColor = config.theme.primaryColor;

  const getFacIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Backpack': return <Backpack className="w-6 h-6" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6" />;
      case 'Music': return <Music className="w-6 h-6" />;
      case 'Presentation':
      default:
        return <Presentation className="w-6 h-6" />;
    }
  };

  return (
    <section 
      id="infrastructure" 
      style={{ backgroundColor: primaryColor }}
      className="w-full text-white py-10 px-4 md:px-8 border-y border-black/20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center text-center">
          {config.facilities.map((fac, idx) => (
            <div key={fac.id} className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-300 mb-2 group-hover:scale-110 transition-transform">
                {getFacIcon(fac.icon)}
              </div>
              <div className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                <EditableText fieldPath={`facilities.${idx}.val`} defaultValue={fac.val} />
              </div>
              <div className="text-xs text-white/90 font-medium tracking-wide mt-0.5">
                <EditableText fieldPath={`facilities.${idx}.label`} defaultValue={fac.label} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
