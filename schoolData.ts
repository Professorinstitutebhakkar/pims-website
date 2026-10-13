export interface AcademicProgram {
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

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  iconName: string;
}

export interface AnnouncementItem {
  id: string;
  month: string;
  day: string;
  year: string;
  title: string;
  description: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  role: string;
  studentGrade: string;
  quote: string;
  avatar: string;
  rating: number;
}

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'pre-primary',
    stage: 'Pre-Primary',
    gradeSpan: 'Nursery to Kindergarten',
    ageSpan: '3 - 5 Years',
    tagline: 'Play. Learn. Grow.',
    description: 'Nurturing curiosity, sensory development, and foundational creativity in a caring, loving environment.',
    curriculumHighlights: [
      'Montessori-inspired sensory learning stations',
      'Phonics, early vocabulary, and storytelling immersion',
      'Foundational numeracy through playful manipulatives',
      'Music, motor skill coordination, and expressive dance'
    ],
    keySubjects: ['Early Language', 'Sensory Math', 'Creative Arts', 'Physical Play & Motor Skills'],
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Baby'
  },
  {
    id: 'primary-school',
    stage: 'Primary School',
    gradeSpan: 'Grades 1 to 5',
    ageSpan: '6 - 10 Years',
    tagline: 'Build. Explore. Discover.',
    description: 'Instilling strong fundamentals, conceptual clarity, and social confidence for an intellectually curious future.',
    curriculumHighlights: [
      'Inquiry-based science and experiential mathematics',
      'Bilingual literacy, creative writing, and public speaking',
      'Digital literacy, foundational coding, and typing labs',
      'Social studies, global geography, and ethical education'
    ],
    keySubjects: ['English Literature', 'Mathematics', 'General Science', 'Global Perspectives', 'Visual Arts'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    iconName: 'BookOpen'
  },
  {
    id: 'middle-school',
    stage: 'Middle School',
    gradeSpan: 'Grades 6 to 8',
    ageSpan: '11 - 13 Years',
    tagline: 'Learn. Engage. Excel.',
    description: 'Encouraging critical thinking, scientific reasoning, collaborative projects, and real-world problem-solving.',
    curriculumHighlights: [
      'Hands-on laboratory sciences (Physics, Chemistry, Biology)',
      'Algebraic foundations, geometry, and competitive logic',
      'World history, civic responsibility, and debate clubs',
      'Modern foreign languages (French, Spanish, Mandarin)'
    ],
    keySubjects: ['Integrated Science', 'Pure Math', 'World History', 'Foreign Languages', 'Computer Science'],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    iconName: 'GraduationCap'
  },
  {
    id: 'high-school',
    stage: 'High School',
    gradeSpan: 'Grades 9 to 10',
    ageSpan: '14 - 15 Years',
    tagline: 'Focus. Achieve. Lead.',
    description: 'Preparing students rigorously for international board certifications, standardized testing, and self-directed leadership.',
    curriculumHighlights: [
      'Cambridge IGCSE & International Baccalaureate MYP streams',
      'Specialized lab courses, advanced data analysis, and robotics',
      'Leadership seminars, model united nations, and community projects',
      'Comprehensive pre-college guidance and mentorship circles'
    ],
    keySubjects: ['Advanced STEM', 'Social Sciences', 'Economics & Business', 'Literature', 'Information Tech'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    iconName: 'Library'
  },
  {
    id: 'senior-secondary',
    stage: 'Senior Secondary',
    gradeSpan: 'Grades 11 to 12',
    ageSpan: '16 - 18 Years',
    tagline: 'Prepare. Perform. Succeed.',
    description: 'Empowering future leaders, research scholars, and university applicants with elite academic pathways.',
    curriculumHighlights: [
      'Advanced Placement (AP) & IB Diploma Programmes (IBDP)',
      'Dedicated Ivy League & Russell Group college application counselling',
      'Independent research thesis and university-level laboratory access',
      'Executive student council, entrepreneurship incubators, and internships'
    ],
    keySubjects: ['AP Calculus / Statistics', 'Biochemistry & Physics', 'Macroeconomics', 'International Relations', 'AI & Machine Learning'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    iconName: 'Briefcase'
  }
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'sports',
    title: 'Sports & Athletics',
    category: 'athletics',
    tagline: 'Teamwork, Agility & Sportsmanship',
    description: 'Olympic-grade indoor sports complex, FIFA-standard turf football field, all-weather tennis courts, and swimming pavilion.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    iconName: 'Trophy'
  },
  {
    id: 'performing-arts',
    title: 'Performing Arts',
    category: 'creative',
    tagline: 'Music, Drama & Expression',
    description: 'Acoustically engineered 650-seat auditorium, digital recording suites, classical orchestration, and annual musical productions.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    iconName: 'Music'
  },
  {
    id: 'visual-arts',
    title: 'Visual Arts',
    category: 'creative',
    tagline: 'Painting, Sculpture & Design',
    description: 'Sunlit fine arts ateliers, pottery kilns, graphic design suites, and juried student gallery exhibitions.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    iconName: 'Palette'
  },
  {
    id: 'life-skills',
    title: 'Life Skills & Cadets',
    category: 'leadership',
    tagline: 'Resilience, Ethics & Self-Reliance',
    description: 'Scouts, NCC cadet discipline, outdoor survival camps, first-aid certifications, and practical financial literacy modules.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    iconName: 'Compass'
  },
  {
    id: 'community-service',
    title: 'Community Service',
    category: 'service',
    tagline: 'Empathy, Stewardship & Impact',
    description: 'Active social impact programs including clean-energy drives, local tutoring clinics, and rural reforestation missions.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    iconName: 'HeartHandshake'
  },
  {
    id: 'clubs-societies',
    title: 'Clubs & Societies',
    category: 'academic',
    tagline: 'Robotics, Debate & Innovation',
    description: 'Over 28 student-run academic societies including VEX Robotics, Model United Nations, Astronomy Society, and Chess Guild.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cpu'
  }
];

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    month: 'MAY',
    day: '20',
    year: '2025',
    title: 'Summer Academic & Tech Camp 2025',
    description: 'Registrations are now open for coding, robotics, creative writing, and tennis summer clinics.',
    category: 'Camp'
  },
  {
    id: 'ann-2',
    month: 'MAY',
    day: '15',
    year: '2025',
    title: 'Parent-Teacher Academic Colloquium',
    description: 'Annual spring term conference scheduled for Saturday, May 24. Schedule your 1-on-1 slot via the portal.',
    category: 'Meeting'
  },
  {
    id: 'ann-3',
    month: 'MAY',
    day: '10',
    year: '2025',
    title: 'Admissions Open for 2025–26 Session',
    description: 'Early intake round closes soon. Merit scholarship assessment dates announced for Grades 6 through 11.',
    category: 'Admissions'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    parentName: 'Dr. Priya Sharma',
    role: 'Pediatric Cardiologist',
    studentGrade: 'Parent of Class 5 Student',
    quote: 'Sunshine International School has been a wonderful experience for my child. The teachers are supportive and the environment is perfect for overall growth.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 't-2',
    parentName: 'Marcus & Elena Vance',
    role: 'Tech Executive & Architect',
    studentGrade: 'Parents of Grade 8 & 11 Scholars',
    quote: 'The academic rigor paired with personalized university guidance allowed our elder son to secure early admissions at his dream university. We couldn’t have chosen a better nurturing ground.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 't-3',
    parentName: 'Amina Al-Mansoor',
    role: 'Diplomatic Mission Director',
    studentGrade: 'Parent of Grade 4 Student',
    quote: 'Moving countries frequently makes continuity difficult, but Sunshine embraced our family with open arms. Our son made friends on day one and blossomed under the curriculum.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5
  }
];
