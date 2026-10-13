import React, { useState } from 'react';
import {
  Quote,
  Star,
  Calendar,
  ArrowRight,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Building
} from 'lucide-react';
import { useSiteConfig, AnnouncementCardItem } from '../context/SiteConfigContext';
import { EditableText } from './EditableText';

interface TriPanelSectionProps {
  onOpenTour: () => void;
  onSelectAnnouncement: (announcement: AnnouncementCardItem) => void;
}

export const TriPanelSection: React.FC<TriPanelSectionProps> = ({
  onOpenTour,
  onSelectAnnouncement
}) => {
  const { config } = useSiteConfig();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const primaryColor = config.theme.primaryColor;
  const testimonials = config.testimonials;
  const testimonial = testimonials[currentTestimonialIndex] || testimonials[0];

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="announcements" className="w-full py-16 px-4 md:px-8 bg-neutral-50/60 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: WHAT PARENTS SAY (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-800">
                  <EditableText fieldPath="testimonialsHeading.title" defaultValue={config.testimonialsHeading.title} />
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="p-1 rounded text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="p-1 rounded text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quote Mark & Body */}
              <div className="pt-4 space-y-3">
                <Quote style={{ color: primaryColor }} className="w-8 h-8 fill-current opacity-80" />
                <p className="text-xs text-neutral-600 italic leading-relaxed min-h-[72px]">
                  "<EditableText fieldPath={`testimonials.${currentTestimonialIndex}.quote`} defaultValue={testimonial.quote} multiline />"
                </p>
              </div>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.parentName}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                    <EditableText fieldPath={`testimonials.${currentTestimonialIndex}.parentName`} defaultValue={testimonial.parentName} />
                  </h4>
                  <div className="text-[10px] text-neutral-500">
                    <EditableText fieldPath={`testimonials.${currentTestimonialIndex}.role`} defaultValue={testimonial.role} />
                  </div>
                </div>
              </div>

              {/* Star Rating & Pagination Dots */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center text-amber-400">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <div className="flex gap-1 pt-1">
                  {testimonials.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setCurrentTestimonialIndex(i)}
                      style={{ backgroundColor: i === currentTestimonialIndex ? primaryColor : undefined }}
                      className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                        i === currentTestimonialIndex ? 'w-3' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: LATEST ANNOUNCEMENTS (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-neutral-100">
                <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-800">
                  <EditableText fieldPath="announcementsHeading.title" defaultValue={config.announcementsHeading.title} />
                </h3>
              </div>

              {/* Announcements List */}
              <div className="pt-3 space-y-3.5">
                {config.announcements.map((ann, idx) => (
                  <div
                    key={ann.id}
                    onClick={() => onSelectAnnouncement(ann)}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    {/* Date Badge */}
                    <div className="w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <span 
                        style={{ color: primaryColor }}
                        className="text-[9px] font-bold tracking-widest leading-none group-hover:text-amber-300"
                      >
                        <EditableText fieldPath={`announcements.${idx}.month`} defaultValue={ann.month} />
                      </span>
                      <span className="text-base font-bold text-neutral-900 group-hover:text-white leading-none mt-0.5">
                        <EditableText fieldPath={`announcements.${idx}.day`} defaultValue={ann.day} />
                      </span>
                    </div>

                    {/* Announcement Details */}
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-neutral-800 transition-colors leading-tight">
                        <EditableText fieldPath={`announcements.${idx}.title`} defaultValue={ann.title} />
                      </h4>
                      <span 
                        style={{ color: primaryColor }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold mt-0.5"
                      >
                        <span>Know More</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Megaphone Graphic */}
            <div className="self-end pt-2 flex items-center justify-end">
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 opacity-90 shadow-inner">
                <Megaphone className="w-7 h-7 -rotate-12" />
              </div>
            </div>
          </div>

          {/* COLUMN 3: SCHEDULE A CAMPUS TOUR (4 Cols) */}
          <div 
            style={{ backgroundColor: primaryColor }}
            className="lg:col-span-4 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden flex flex-col justify-between transition-colors duration-300"
          >
            {/* Background Architectural Watermark */}
            <div className="absolute -right-6 -bottom-6 text-white/10 pointer-events-none">
              <Building className="w-48 h-48" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-widest uppercase text-amber-300">
                <Calendar className="w-3 h-3" />
                <EditableText fieldPath="tourCard.badge" defaultValue={config.tourCard.badge} />
              </div>

              <h3 className="font-serif font-bold text-2xl text-white leading-tight">
                <EditableText fieldPath="tourCard.title" defaultValue={config.tourCard.title} />
              </h3>

              <p className="text-xs text-white/90 leading-relaxed">
                <EditableText fieldPath="tourCard.description" defaultValue={config.tourCard.description} multiline />
              </p>
            </div>

            {/* Tour Action Button */}
            <div className="pt-6 relative z-10">
              <button
                onClick={onOpenTour}
                className="w-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs py-3 px-4 rounded-lg shadow-md tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>
                  <EditableText fieldPath="tourCard.buttonText" defaultValue={config.tourCard.buttonText} />
                </span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
