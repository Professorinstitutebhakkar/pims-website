import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AcademicProgramItem {
  id: string;
  stage: string;
  gradeSpan: string;
  ageSpan: string;
  tagline: string;
  description: string;
  curriculumHighlights: string[];
  keySubjects: string[];
  image: string;
  iconName: string;
}

export interface ActivityCardItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  iconName: string;
}

export interface AnnouncementCardItem {
  id: string;
  month: string;
  day: string;
  year: string;
  title: string;
  description: string;
  category: string;
}

export interface TestimonialCardItem {
  id: string;
  parentName: string;
  role: string;
  studentGrade: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface FullSiteConfig {
  brand: {
    nameLine1: string;
    nameLine2: string;
    motto: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    badgeText: string;
    crestInitials: string;
    logoType?: 'image' | 'crest';
    logoImageUrl?: string;
    logoIcon?: string;
  };
  theme: {
    primaryColor: string;
    primaryDark: string;
    accentColor: string;
    fontFamily: string;
  };
  topBar: {
    portalLabel: string;
    careersLabel: string;
    alumniLabel: string;
  };
  navigation: {
    home: string;
    about: string;
    academics: string;
    admissions: string;
    campusLife: string;
    gallery: string;
    contact: string;
    enquireButton: string;
    menuItems?: Array<{
      id: string;
      label: string;
      actionType: 'scroll' | 'modal' | 'link';
      target: string;
      subItems?: Array<{
        id: string;
        label: string;
        description?: string;
        actionType: 'scroll' | 'modal' | 'link';
        target: string;
        badge?: string;
      }>;
    }>;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta1Text: string;
    cta2Text: string;
    studentImage: string;
    bookBadgeLine1: string;
    bookBadgeLine2: string;
    badges: Array<{ id: string; label: string; icon: string }>;
    enquiryCardTitle: string;
    enquiryCardSubtitle: string;
    enquirySubmitText: string;
  };
  about: {
    kicker: string;
    headline: string;
    description: string;
    campusImage: string;
    buttonText: string;
    stats: Array<{ id: string; val: string; label: string; icon: string }>;
  };
  programsHeading: {
    kicker: string;
    headline: string;
    description: string;
  };
  programs: AcademicProgramItem[];
  facilities: Array<{ id: string; val: string; label: string; icon: string }>;
  activitiesHeading: {
    kicker: string;
    headline: string;
    description: string;
  };
  activities: ActivityCardItem[];
  testimonialsHeading: {
    title: string;
  };
  testimonials: TestimonialCardItem[];
  announcementsHeading: {
    title: string;
  };
  announcements: AnnouncementCardItem[];
  tourCard: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
  };
  footer: {
    aboutText: string;
    col2Title: string;
    col3Title: string;
    col4Title: string;
    col5Title: string;
    newsletterTitle: string;
    newsletterDesc: string;
    copyrightText: string;
  };
}

export const INITIAL_FULL_CONFIG: FullSiteConfig = {
  brand: {
    nameLine1: "PROFESSORS",
    nameLine2: "INSTITUTE OF MEDICAL SCIENCES BHAKKAR",
    motto: "Excellence in Medical Education & Patient Care",
    address: "Opposite Canal Rest House Near Ghouri Filling Station Darya Khan Road Bhakkar",
    phone: "0337-4175737 / 0336-7917737",
    email: "professorsinstitutebhakkar@gmail.com",
    website: "www.professorsinstituteofmedicalsciencesbhakkar.edu.pk",
    badgeText: "EST. 2026 • BHAKKAR",
    crestInitials: "PIMS",
    logoType: "crest",
    logoImageUrl: "",
    logoIcon: "HeartPulse"
  },
  theme: {
    primaryColor: "#7B1113",
    primaryDark: "#5C0D0E",
    accentColor: "#F59E0B",
    fontFamily: "serif"
  },
  topBar: {
    portalLabel: "Parent Portal",
    careersLabel: "Careers",
    alumniLabel: "Alumni"
  },
  navigation: {
    home: "HOME",
    about: "ABOUT US",
    academics: "ACADEMICS",
    admissions: "ADMISSIONS",
    campusLife: "CAMPUS LIFE",
    gallery: "GALLERY",
    contact: "CONTACT US",
    enquireButton: "ENQUIRE NOW",
    menuItems: [
      {
        id: "nav-home",
        label: "HOME",
        actionType: "scroll",
        target: "top"
      },
      {
        id: "nav-about",
        label: "ABOUT US",
        actionType: "scroll",
        target: "about",
        subItems: [
          {
            id: "sub-about-overview",
            label: "Overview & Mission",
            description: "History, vision, and core values of the institute",
            actionType: "scroll",
            target: "about"
          },
          {
            id: "sub-about-stats",
            label: "Key Milestones & Faculty",
            description: "Faculty strength, student-teacher ratio & achievements",
            actionType: "scroll",
            target: "about"
          },
          {
            id: "sub-about-tour",
            label: "Campus Tour Booking",
            description: "Book an in-person physical tour of the campus",
            actionType: "modal",
            target: "tour",
            badge: "VISIT"
          }
        ]
      },
      {
        id: "nav-academics",
        label: "ACADEMICS",
        actionType: "scroll",
        target: "academics",
        subItems: [
          {
            id: "sub-acad-programs",
            label: "Academic Programs",
            description: "LHV, Nursing & Healthcare diplomas & disciplines",
            actionType: "scroll",
            target: "academics"
          },
          {
            id: "sub-acad-labs",
            label: "Labs & Classrooms",
            description: "Clinical anatomy, pathology & modern smart labs",
            actionType: "scroll",
            target: "infrastructure"
          },
          {
            id: "sub-acad-cal",
            label: "Exam & Academic Calendar",
            description: "Term schedules, tests, and semester dates",
            actionType: "scroll",
            target: "announcements"
          }
        ]
      },
      {
        id: "nav-admissions",
        label: "ADMISSIONS",
        actionType: "modal",
        target: "enquiry",
        subItems: [
          {
            id: "sub-adm-open",
            label: "Online Admission Form",
            description: "Apply online for 2026–2028 session",
            actionType: "modal",
            target: "enquiry",
            badge: "OPEN"
          },
          {
            id: "sub-adm-eligibility",
            label: "Eligibility & Criteria",
            description: "Matric Science requirements & age criteria",
            actionType: "modal",
            target: "enquiry"
          },
          {
            id: "sub-adm-tour",
            label: "Schedule Campus Visit",
            description: "Consult admissions counselors on campus",
            actionType: "modal",
            target: "tour"
          }
        ]
      },
      {
        id: "nav-campus-life",
        label: "CAMPUS LIFE",
        actionType: "scroll",
        target: "activities",
        subItems: [
          {
            id: "sub-life-activities",
            label: "Co-Curricular Activities",
            description: "Sports, healthcare seminars & student societies",
            actionType: "scroll",
            target: "activities"
          },
          {
            id: "sub-life-facilities",
            label: "Campus Facilities",
            description: "Hostel, cafeteria, library & clinical exposure",
            actionType: "scroll",
            target: "infrastructure"
          },
          {
            id: "sub-life-notices",
            label: "News & Announcements",
            description: "Latest institute updates and alerts",
            actionType: "scroll",
            target: "announcements"
          }
        ]
      },
      {
        id: "nav-gallery",
        label: "GALLERY",
        actionType: "scroll",
        target: "activities"
      },
      {
        id: "nav-contact",
        label: "CONTACT US",
        actionType: "scroll",
        target: "footer",
        subItems: [
          {
            id: "sub-contact-info",
            label: "Campus Map & Address",
            description: "Darya Khan Road, Bhakkar location details",
            actionType: "scroll",
            target: "footer"
          },
          {
            id: "sub-contact-tour",
            label: "Book Appointment",
            description: "Meet our principal and academic deans",
            actionType: "modal",
            target: "tour"
          }
        ]
      }
    ]
  },
  hero: {
    eyebrow: "WHERE YOUNG MINDS",
    titleLine1: "Learn. Grow.",
    titleLine2: "Succeed.",
    subtitle: "Empowering students with knowledge, values and skills to thrive in a changing world.",
    cta1Text: "ADMISSIONS OPEN 2026-28",
    cta2Text: "CONTACT US",
    studentImage: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/ju;h.jpeg?auto=enhance",
    bookBadgeLine1: "EXPLORE LEARN",
    bookBadgeLine2: "GROW",
    badges: [
      {
        id: "b1",
        label: "Holistic Care & Education",
        icon: "BookOpen"
      },
      {
        id: "b2",
        label: "Experienced Faculty",
        icon: "Award"
      },
      {
        id: "b3",
        label: "Global Health Care Standards",
        icon: "Globe"
      },
      {
        id: "b4",
        label: "Safe & Nurturing Campus",
        icon: "HeartHandshake"
      },
      {
        id: "b5",
        label: "State-of-the-Art Clinical Labs",
        icon: "Building2"
      }
    ],
    enquiryCardTitle: "ENQUIRE NOW",
    enquiryCardSubtitle: "We will get in touch with you!",
    enquirySubmitText: "SUBMIT ENQUIRY"
  },
  about: {
    kicker: "WELCOME TO PROFESSOR'S INSTITUTE OF MEDICAL SCIENCES BHAKKAR",
    headline: "Where Your Healthcare Career Begins",
    description: "At Professor's Institute of Medical Sciences Bhakkar, we combine advanced clinical training, modern facilities, and expert faculty mentorship to prepare nurses for global healthcare opportunities.",
    campusImage: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/jjkklj.jpeg",
    buttonText: "KNOW MORE ABOUT US",
    stats: [
      {
        id: "s1",
        val: "1.5 +",
        label: "Years of Excellence",
        icon: "Award"
      },
      {
        id: "s2",
        val: "14 +",
        label: "Dedicated Faculty",
        icon: "Users"
      },
      {
        id: "s3",
        val: "100 +",
        label: "Happy Students",
        icon: "GraduationCap"
      },
      {
        id: "s4",
        val: "15:1",
        label: "Student Teacher Ratio",
        icon: "UserCheck"
      },
      {
        id: "s5",
        val: "5+",
        label: "Sports & Co-curricular Activities",
        icon: "Trophy"
      },
      {
        id: "s6",
        val: "100%",
        label: "Safe & Secure Campus",
        icon: "ShieldCheck"
      }
    ]
  },
  programsHeading: {
    kicker: "OUR ACADEMIC PROGRAMS",
    headline: "Programs Designed for Every Stage",
    description: "A comprehensive educational progression preparing learners for intellectual rigor and healthcare leadership."
  },
  programs: [
    {
      id: "pre-primary",
      stage: "LHV",
      gradeSpan: "LHV to Registered Nurse",
      ageSpan: "2 Years Diploma",
      tagline: "Lady Health Visitor",
      description: "Government Health Sector:\nBasic Health Units (BHUs), Rural Health Centers (RHCs), and Tehsil Headquarter (THQ) hospitals.\n\nLady Health Visitor / Community Health Officer positions.\n\nPrivate Sector & Clinics:\nPrivate maternity homes, gynecology clinics, and child healthcare centers.\n\nNGOs & Development Sector:\nMaternal and Child Health (MCH) projects with UNICEF, WHO, and PPHI.",
      curriculumHighlights: [
        "Maternal & Child Healthcare",
        "Community Preventive Medicine",
        "Clinical Antenatal Care",
        "Primary Healthcare Practices"
      ],
      keySubjects: [
        "Anatomy & Physiology",
        "Maternal Health",
        "Community Health",
        "Midwifery Basics"
      ],
      image: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/Gemini_Generated_Image_f8vxeaf8vxeaf8vx.jpg",
      iconName: "Baby"
    },
    {
      id: "primary-school",
      stage: "CNA",
      gradeSpan: "CNA to Registered Nurse",
      ageSpan: "2 Years Diploma",
      tagline: "Certified Nursing Assistant",
      description: "Hospital Ward / Patient Care Assistant: Assisting staff nurses in ICUs, emergency rooms, operation theaters, and general medical/surgical wards.\n\nClinic / Outpatient Care Assistant: Managing vital signs, patient intake, and basic dressing/procedures in private clinics or diagnostic centers.\n\nHome Healthcare Aide: Providing specialized long-term bedside care, elderly care, and rehabilitation assistance.",
      curriculumHighlights: [
        "Clinical Bedside Patient Care",
        "Emergency Life Support",
        "Sterilization & Aseptic Techniques",
        "Vital Signs Monitoring"
      ],
      keySubjects: [
        "Fundamentals of Nursing",
        "Applied Microbiology",
        "Pharmacology Basics",
        "First Aid & CPR"
      ],
      image: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/Gemini_Generated_Image_s72mi5s72mi5s72m.jpg?auto=enhance",
      iconName: "BookOpen"
    },
    {
      id: "middle-school",
      stage: "CMW",
      gradeSpan: "CMW to Registered Midwife",
      ageSpan: "2 Years Diploma",
      tagline: "Community Midwife",
      description: "Government Health Sector:\nBasic Health Units (BHUs), Rural Health Centers (RHCs), and Tehsil Headquarter (THQ) Hospitals.\n\nPrimary Maternal and Child Health (MCH) Centers.\n\nPrivate Healthcare Sector:\nPrivate Maternity Homes, Gynecological Clinics, and General Hospitals.\n\nIndependent Practice:\nEstablishing independent community-based birthing and maternal care centers in rural/suburban areas.",
      curriculumHighlights: [
        "Normal & High-Risk Deliveries",
        "Neonatal Resuscitation",
        "Reproductive Health Care",
        "Rural Health Initiatives"
      ],
      keySubjects: [
        "Midwifery Science",
        "Obstetric Nursing",
        "Newborn Care",
        "Public Health"
      ],
      image: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/Gemini_Generated_Image_f8vxeaf8vxeaf8vx.jpg?auto=enhance",
      iconName: "GraduationCap"
    },
    {
      id: "high-school",
      stage: "BSN",
      gradeSpan: "Coming Soon",
      ageSpan: "4 Years Degree",
      tagline: "Bachelor in Nursing",
      description: "Staff Nurse (BPS-16 in Govt Sector): Direct entry into government hospitals (THQ, DHQ, Tertiary Care Centers) or major private hospital networks.\n\nSpecialized Unit Nurse: ICU, Critical Care (CCU), Operation Theater (OT), Emergency & Trauma, and Pediatric Units.\n\nHead Nurse / Ward In-Charge (BPS-17): Managing ward administrative duties, supervising staff, and directing patient care.",
      curriculumHighlights: [
        "Comprehensive Clinical Residency",
        "Critical Care & Intensive Care",
        "Evidence-Based Practice Research",
        "Healthcare Administration"
      ],
      keySubjects: [
        "Advanced Medical Nursing",
        "Pathophysiology",
        "Epidemiology",
        "Nursing Leadership"
      ],
      image: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/Gemini_Generated_Image_s72mi5s72mi5s72m.jpg?auto=enhance",
      iconName: "Library"
    },
    {
      id: "senior-secondary",
      stage: "PHARMACY TECHNICIAN",
      gradeSpan: "Medical Store License",
      ageSpan: "2 Years Diploma",
      tagline: "B-Category",
      description: "Hospital Pharmacy Assistant: Working in public sector (DHQ, THQ) or private hospitals under the supervision of a registered Pharmacist (Pharm-D) to manage inventory, fill prescriptions, and handle drug storage.\n\nOutpatient & Retail Pharmacy Management: Eligible to obtain medical store / pharmacy license (B-Category).\n\nPharmaceutical Manufacturing: Assisting in production, quality control, packaging, and raw material inventory.",
      curriculumHighlights: [
        "Drug Dispensing & Dosing",
        "Pharmacology & Therapeutics",
        "Pharmaceutical Law & Ethics",
        "Inventory Management"
      ],
      keySubjects: [
        "Pharmaceutics",
        "Pharmacology",
        "Pharmacognosy",
        "Hospital Pharmacy"
      ],
      image: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/young-hispanic-woman-pharmacist-smiling-confident-standing-with-arms-crossed-gesture-pharmacy_839833-7087.avif",
      iconName: "Briefcase"
    }
  ],
  facilities: [
    {
      id: "f1",
      val: "2+",
      label: "Kanal Campus",
      icon: "Building2"
    },
    {
      id: "f2",
      val: "12+",
      label: "Classrooms",
      icon: "Backpack"
    },
    {
      id: "f3",
      val: "4",
      label: "Labs",
      icon: "FlaskConical"
    },
    {
      id: "f4",
      val: "2",
      label: "Playground",
      icon: "Music"
    },
    {
      id: "f5",
      val: "100%",
      label: "Digital Campus",
      icon: "Presentation"
    }
  ],
  activitiesHeading: {
    kicker: "BEYOND CLASSROOMS",
    headline: "Holistic Development Through Activities",
    description: "We believe education happens everywhere — in clinical attachments, workshops, and sports pavilions."
  },
  activities: [
    {
      id: "sports",
      title: "Sports & Athletics",
      category: "athletics",
      tagline: "Agility & Sportsmanship",
      description: "Olympic-grade sports area, football field, and outdoor activities.",
      image: "https://6acdd7e87d990bca654343cb.imgix.net/sandbox/images%20(1).jpg",
      iconName: "Trophy"
    },
    {
      id: "performing-arts",
      title: "Clinical Workshops",
      category: "creative",
      tagline: "Practical Simulation",
      description: "Emergency CPR workshops, patient handling, and clinical symposiums.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      iconName: "Music"
    },
    {
      id: "visual-arts",
      title: "Health Seminars",
      category: "creative",
      tagline: "Awareness & Research",
      description: "Public health exhibitions, medical posters, and guest lectures.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      iconName: "Palette"
    },
    {
      id: "life-skills",
      title: "Life Skills & First Aid",
      category: "leadership",
      tagline: "Emergency Response",
      description: "Basic life support certification, disaster management, and ethics.",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      iconName: "Compass"
    },
    {
      id: "community-service",
      title: "Free Medical Camps",
      category: "service",
      tagline: "Community Outreach",
      description: "Free medical and screening camps in rural areas of Bhakkar.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      iconName: "HeartHandshake"
    },
    {
      id: "clubs-societies",
      title: "Medical Societies",
      category: "academic",
      tagline: "Innovation & Debate",
      description: "Student nursing society, pharmacy guild, and health awareness club.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
      iconName: "Cpu"
    }
  ],
  testimonialsHeading: {
    title: "WHAT PARENTS SAY"
  },
  testimonials: [
    {
      id: "t1",
      parentName: "Zaman Babr",
      role: "Parent of LHV Student",
      studentGrade: "LHV Program",
      quote: "Professor's Institute of Medical Sciences Bhakkar has been a wonderful experience for my daughter. The teachers are supportive and the clinical training environment is perfect for career growth.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5
    },
    {
      id: "t2",
      parentName: "Bilal",
      role: "Parent of CNA 1st Year Student",
      studentGrade: "CNA Program",
      quote: "The academic rigor combined with clinical hospital training helped our son unlock his true potential in medical and nursing education.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 5
    }
  ],
  announcementsHeading: {
    title: "LATEST ANNOUNCEMENTS"
  },
  announcements: [
    {
      id: "a1",
      month: "OCT",
      day: "12",
      year: "2024",
      title: "Session 2026-28 Registrations Open!",
      description: "Apply for LHV, CNA, CMW, PHARMACY TECHNICIAN, DISPENSER, MLT, OTT, X-RAY, PHYSIOTHERAPY, DENTAL.",
      category: "Admissions"
    },
    {
      id: "a2",
      month: "SEP",
      day: "23",
      year: "2024",
      title: "Teachers Meeting for Classes of Session 2026-28",
      description: "Discussion on clinical schedules, practical labs, and term evaluations.",
      category: "Meeting"
    },
    {
      id: "a3",
      month: "DEC",
      day: "25",
      year: "2024",
      title: "Last Date for Admissions 2026-28 Session",
      description: "Limited seats available for students across District Bhakkar.",
      category: "Admissions"
    }
  ],
  tourCard: {
    badge: "SCHEDULE A CAMPUS VISIT",
    title: "SCHEDULE A CAMPUS VISIT",
    description: "Visit our campus and clinical labs to experience the difference in person.",
    buttonText: "BOOK YOUR VISIT"
  },
  footer: {
    aboutText: "Empowering students with medical knowledge, clinical skills, and patient-first values to excel in global healthcare.",
    col2Title: "QUICK LINKS",
    col3Title: "ACADEMICS",
    col4Title: "ADMISSIONS",
    col5Title: "CONTACT US",
    newsletterTitle: "NEWSLETTER",
    newsletterDesc: "Stay updated with our latest merit lists and event notices.",
    copyrightText: "© 2026 Professor's Institute of Medical Sciences Bhakkar. All Rights Reserved."
  }
};

interface SiteConfigContextType {
  config: FullSiteConfig;
  updateConfig: (newConfig: Partial<FullSiteConfig> | ((prev: FullSiteConfig) => FullSiteConfig)) => void;
  resetConfig: () => void;
  isInlineEditActive: boolean;
  setIsInlineEditActive: (val: boolean | ((prev: boolean) => boolean)) => void;
  isFullCMSOpen: boolean;
  setIsFullCMSOpen: (val: boolean) => void;
  updateField: (path: string, value: any) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<FullSiteConfig>(() => {
    try {
      const saved = localStorage.getItem('full_site_config_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.brand && parsed.brand.nameLine1 === 'PROFESSORS') {
          if (!parsed.navigation?.menuItems || parsed.navigation.menuItems.length === 0) {
            parsed.navigation = {
              ...parsed.navigation,
              menuItems: INITIAL_FULL_CONFIG.navigation.menuItems
            };
          }
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_FULL_CONFIG;
  });

  const [isInlineEditActive, setIsInlineEditActive] = useState<boolean>(false);
  const [isFullCMSOpen, setIsFullCMSOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('full_site_config_data_v2', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<FullSiteConfig> | ((prev: FullSiteConfig) => FullSiteConfig)) => {
    setConfig(prev => {
      if (typeof newConfig === 'function') {
        return newConfig(prev);
      }
      return { ...prev, ...newConfig };
    });
  };

  const updateField = (path: string, value: any) => {
    setConfig(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const resetConfig = () => {
    setConfig(INITIAL_FULL_CONFIG);
    try {
      localStorage.setItem('full_site_config_data_v2', JSON.stringify(INITIAL_FULL_CONFIG));
    } catch {
      // ignore
    }
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isInlineEditActive,
        setIsInlineEditActive,
        isFullCMSOpen,
        setIsFullCMSOpen,
        updateField
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
