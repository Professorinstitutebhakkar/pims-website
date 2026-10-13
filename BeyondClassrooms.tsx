import React from 'react';
import {
  Trophy,
  Music,
  Palette,
  Compass,
  HeartHandshake,
  Cpu,
  Edit2
} from 'lucide-react';
import { useSiteConfig, ActivityCardItem } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface BeyondClassroomsProps {
  onSelectActivity?: (activity: ActivityCardItem) => void;
}

export const BeyondClassrooms: React.FC<BeyondClassroomsProps> = ({ onSelectActivity }) => {
  const { config, isInlineEditActive, updateField } = useSiteConfig();
  const primaryColor = config.theme.primaryColor;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-4 h-4 text-white" />;
      case 'Music': return <Music className="w-4 h-4 text-white" />;
      case 'Palette': return <Palette className="w-4 h-4 text-white" />;
      case 'Compass': return <Compass className="w-4 h-4 text-white" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-white" />;
      case 'Cpu':
      default:
        return <Cpu className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="activities" className="w-full py-16 px-4 md:px-8 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span 
            style={{ color: primaryColor }}
            className="text-xs font-bold uppercase tracking-widest block"
          >
            <EditableText fieldPath="activitiesHeading.kicker" defaultValue={config.activitiesHeading.kicker} />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">
            <EditableText fieldPath="activitiesHeading.headline" defaultValue={config.activitiesHeading.headline} />
          </h2>
        </div>

        {/* 6 Cards Grid matching reference */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {config.activities.map((act, idx) => (
            <div
              key={act.id}
              onClick={() => onSelectActivity && onSelectActivity(act)}
              className="group cursor-pointer flex flex-col items-center text-center space-y-3"
            >
              {/* Image Frame with Badge */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-neutral-200/80 bg-neutral-100">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlaid Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Circular Badge at Bottom Left */}
                <div 
                  style={{ backgroundColor: primaryColor }}
                  className="absolute bottom-2 left-2 w-8 h-8 rounded-full border border-white shadow-md flex items-center justify-center"
                >
                  {getIcon(act.iconName)}
                </div>

                {isInlineEditActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newUrl = prompt(`Enter Image URL for ${act.title}:`, act.image);
                      if (newUrl) updateField(`activities.${idx}.image`, newUrl);
                    }}
                    className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-md z-10"
                  >
                    <Edit2 className="w-2.5 h-2.5 text-amber-400" />
                    <span>Img</span>
                  </button>
                )}
              </div>

              {/* Title */}
              <div>
                <h4 className="text-xs font-bold text-neutral-800 transition-colors leading-tight">
                  <EditableText fieldPath={`activities.${idx}.title`} defaultValue={act.title} />
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
