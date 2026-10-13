import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { AcademicProgram, AnnouncementItem } from '../data/schoolData';
import { AcademicProgramItem, useSiteConfig } from '../context/SiteConfigContext';

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. ENQUIRY MODAL
export const EnquiryModal: React.FC<ModalBaseProps> = ({ isOpen, onClose }) => {
  const { config } = useSiteConfig();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    grade: config.programs[0]?.stage || 'LHV',
    academicYear: '2026–2028',
    notes: ''
  });

  const primaryColor = config.theme.primaryColor;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200">
        <div style={{ backgroundColor: primaryColor }} className="p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg">ADMISSIONS ENQUIRY 2026–28</h3>
            <p className="text-xs text-white/90">Connect directly with our admissions counsellors</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">Enquiry Submitted!</h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Thank you! Our admissions coordinator will reach out to <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> with the prospectus and fee schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.parentName}
                    onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Student Name</label>
                  <input
                    type="text"
                    placeholder="Candidate's Name"
                    value={formData.studentName}
                    onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0337-4175737"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Program of Interest</label>
                  <select
                    value={formData.grade}
                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none bg-white"
                  >
                    {config.programs.map(p => (
                      <option key={p.id} value={p.stage}>{p.stage} - {p.tagline}</option>
                    ))}
                    <option value="Dispenser">Dispenser Course</option>
                    <option value="MLT">Medical Lab Technology (MLT)</option>
                    <option value="OTT">Operation Theater Tech (OTT)</option>
                    <option value="Physiotherapy">Physiotherapy Assistant</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Academic Session</label>
                  <select
                    value={formData.academicYear}
                    onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none bg-white"
                  >
                    <option value="2026–2028">Session 2026–2028 (Admissions Open)</option>
                    <option value="2025–2027">Session 2025–2027</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Inquiries / Previous Education</label>
                <textarea
                  rows={2}
                  placeholder="Matric Science Marks / FSc pre-medical background..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="w-full text-white py-2.5 rounded-md font-bold tracking-wider uppercase text-xs shadow-md transition-all cursor-pointer hover:opacity-95"
                >
                  SUBMIT ADMISSIONS DOSSIER
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. CAMPUS TOUR MODAL
export const TourModal: React.FC<ModalBaseProps> = ({ isOpen, onClose }) => {
  const { config } = useSiteConfig();
  const [booked, setBooked] = useState(false);
  const [tourDetails, setTourDetails] = useState({
    date: '2026-10-20',
    slot: '10:00 AM - 12:00 PM',
    name: '',
    phone: ''
  });

  const primaryColor = config.theme.primaryColor;

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200">
        <div style={{ backgroundColor: primaryColor }} className="p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-serif font-bold text-base">SCHEDULE A CAMPUS VISIT</h3>
              <p className="text-[11px] text-white/90">Experience our clinical labs and campus in Bhakkar</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs">
          {booked ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">Campus Visit Scheduled!</h4>
              <p className="text-neutral-600">
                We look forward to welcoming you on <strong>{tourDetails.date}</strong> at <strong>{tourDetails.slot}</strong>. An SMS confirmation has been dispatched.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={tourDetails.date}
                  onChange={e => setTourDetails({ ...tourDetails, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Time Slot *</label>
                <select
                  value={tourDetails.slot}
                  onChange={e => setTourDetails({ ...tourDetails, slot: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none bg-white"
                >
                  <option value="09:00 AM - 11:00 AM">Morning Session (09:00 AM – 11:00 AM)</option>
                  <option value="11:30 AM - 01:30 PM">Midday Session (11:30 AM – 01:30 PM)</option>
                  <option value="02:30 PM - 04:30 PM">Afternoon Session (02:30 PM – 04:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Candidate / Parent Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={tourDetails.name}
                  onChange={e => setTourDetails({ ...tourDetails, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="0337-4175737"
                  value={tourDetails.phone}
                  onChange={e => setTourDetails({ ...tourDetails, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="w-full text-white py-2.5 rounded-md font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer hover:opacity-95"
                >
                  CONFIRM APPOINTMENT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. ACADEMIC PROGRAM DETAIL MODAL
interface ProgramModalProps extends ModalBaseProps {
  program: AcademicProgramItem | AcademicProgram | null;
  onOpenEnquiry: () => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  isOpen,
  onClose,
  program,
  onOpenEnquiry
}) => {
  const { config } = useSiteConfig();
  if (!isOpen || !program) return null;

  const primaryColor = config.theme.primaryColor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-neutral-200">
        <div className="relative aspect-video w-full bg-neutral-900">
          <img
            src={program.image}
            alt={program.stage}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
              {program.gradeSpan} • {program.ageSpan}
            </span>
            <h3 className="font-serif text-2xl font-bold">{program.stage}</h3>
            <p className="text-xs text-amber-200 font-semibold">{program.tagline}</p>
          </div>
        </div>

        <div className="p-6 space-y-4 text-xs text-neutral-700 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-900 text-[11px] mb-1.5">
              Career Scope & Opportunities
            </h4>
            <p className="leading-relaxed text-xs text-neutral-600 whitespace-pre-line">
              {program.description}
            </p>
          </div>

          {program.curriculumHighlights && program.curriculumHighlights.length > 0 && (
            <div>
              <h4 className="font-bold uppercase tracking-wider text-neutral-900 text-[11px] mb-1.5 flex items-center gap-1.5">
                <Sparkles style={{ color: primaryColor }} className="w-3.5 h-3.5" /> Course Highlights
              </h4>
              <ul className="space-y-1 pl-4 list-disc text-neutral-600">
                {program.curriculumHighlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {program.keySubjects && program.keySubjects.length > 0 && (
            <div>
              <h4 className="font-bold uppercase tracking-wider text-neutral-900 text-[11px] mb-1.5">
                Core Subject Areas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {program.keySubjects.map((sub, i) => (
                  <span key={i} className="px-2.5 py-1 bg-amber-50 text-neutral-800 rounded-md font-semibold text-[11px] border border-amber-200">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 flex items-center justify-between border-t border-neutral-100">
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              style={{ backgroundColor: primaryColor }}
              className="text-white px-5 py-2 rounded-md font-bold hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Apply For {program.stage}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. SEARCH MODAL
export const SearchModal: React.FC<ModalBaseProps> = ({ isOpen, onClose }) => {
  const { config } = useSiteConfig();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = [
    { title: 'Admissions Open 2026-28 (LHV, CNA, CMW, Pharmacy)', category: 'Admissions', link: 'about' },
    { title: 'Lady Health Visitor (LHV) Program', category: 'Academics', link: 'academics' },
    { title: 'Certified Nursing Assistant (CNA) Program', category: 'Academics', link: 'academics' },
    { title: 'Community Midwife (CMW) Program', category: 'Academics', link: 'academics' },
    { title: 'Pharmacy Technician (B-Category)', category: 'Academics', link: 'academics' },
    { title: 'Bachelor in Nursing (BSN Generic)', category: 'Academics', link: 'academics' },
    { title: 'Clinical Laboratories & Campus Facilities', category: 'Facilities', link: 'infrastructure' },
    { title: 'Contact Details & Darya Khan Road Campus', category: 'Contact', link: 'footer' }
  ].filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.category.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelect = (sectionId: string) => {
    onClose();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200">
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <input
            type="text"
            autoFocus
            placeholder="Search programs (LHV, CNA, CMW, Pharmacy, campus)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400"
          />
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-72 overflow-y-auto space-y-2">
          {results.length > 0 ? (
            results.map((res, i) => (
              <div
                key={i}
                onClick={() => handleSelect(res.link)}
                className="p-2.5 rounded-lg hover:bg-neutral-100 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-800 group-hover:text-red-900">
                    {res.title}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    Category: {res.category}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-900 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-neutral-400">
              No matching results found for "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};