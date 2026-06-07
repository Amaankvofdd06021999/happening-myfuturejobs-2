// Comprehensive Mock Data for MYFutureJobs Portal

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  matchScore?: number;
  applicationDeadline: string;
  experienceLevel: string;
  category: string;
  skills: string[];
  isVerified: boolean;
  applicants: number;
  views: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  job: JobListing;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interview' | 'KIV' | 'Offered' | 'Rejected';
  matchScore: number;
  nextSteps?: string;
  interviewDate?: string;
  interviewLocation?: string;
  notes?: string;
  timeline: ApplicationTimeline[];
}

export interface ApplicationTimeline {
  date: string;
  status: string;
  description: string;
  icon?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'jobseeker' | 'employer' | 'officer';
  location: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  careerSignalScore: number;
  profileCompleteness: number;
  preferences: JobPreferences;
  documents: Document[];
  isVerified: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: 'skill' | 'milestone' | 'recognition';
}

export interface JobPreferences {
  desiredSalary: string;
  locations: string[];
  jobTypes: string[];
  workModes: string[];
  industries: string[];
  availability: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'certificate' | 'other';
  url: string;
  uploadedDate: string;
}

export interface CareerEvent {
  id: string;
  title: string;
  type: 'Career Fair' | 'Training' | 'Workshop' | 'Hiring Event';
  date: string;
  endDate?: string;
  location: string;
  description: string;
  image: string;
  organizer: string;
  registeredCount: number;
  capacity: number;
  isRegistered?: boolean;
  tags: string[];
  speakers?: string[];
  partners?: string[];
  agenda?: string[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  startDate: string;
  mode: 'Online' | 'Classroom' | 'Hybrid';
  price: number;
  isHRDCClaimable: boolean;
  description: string;
  curriculum: string[];
  certification?: string;
  rating: number;
  reviews: number;
  enrolled: number;
  category: string;
  skills: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'Transport' | 'Meal' | 'Training' | 'Equipment';
  value: number;
  expiryDate: string;
  code: string;
  isUsed: boolean;
  conditions: string[];
  merchant?: string;
}

export interface Employer {
  id: string;
  companyName: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  description: string;
  benefits: string[];
  culture: string[];
  vacancies: Vacancy[];
  isVerified: boolean;
  rating: number;
  reviews: number;
}

export interface Vacancy {
  id: string;
  jobId: string;
  status: 'Draft' | 'Active' | 'Paused' | 'Closed';
  createdDate: string;
  applications: number;
  views: number;
  shortlisted: number;
  interviewed: number;
  offered: number;
}

export interface Candidate {
  id: string;
  userId: string;
  profile: UserProfile;
  appliedDate: string;
  matchScore: number;
  fitDimensions: FitDimension[];
  status: 'New' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
  notes: string;
  strengths: string[];
  gaps: string[];
  interviewQuestions?: string[];
}

export interface FitDimension {
  dimension: string;
  score: number;
  description: string;
}

// Mock Data Implementation

export const mockJobListings: JobListing[] = [
  {
    id: 'job-001',
    title: 'Senior Software Engineer',
    company: 'Petronas Digital',
    companyLogo: '/api/placeholder/40/40',
    location: 'Kuala Lumpur',
    salary: 'RM 8,000 - 12,000',
    type: 'Full-time',
    workMode: 'Hybrid',
    postedDate: '2024-01-15',
    description: 'We are looking for a Senior Software Engineer to join our digital transformation team...',
    requirements: [
      '5+ years of software development experience',
      'Proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong problem-solving skills'
    ],
    benefits: [
      'Medical coverage for family',
      'Annual bonus',
      'Flexible working hours',
      'Learning & development budget'
    ],
    matchScore: 85,
    applicationDeadline: '2024-02-15',
    experienceLevel: 'Senior',
    category: 'Technology',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    isVerified: true,
    applicants: 47,
    views: 892
  },
  {
    id: 'job-002',
    title: 'Marketing Executive',
    company: 'Maybank',
    companyLogo: '/api/placeholder/40/40',
    location: 'Selangor',
    salary: 'RM 4,500 - 6,000',
    type: 'Full-time',
    workMode: 'On-site',
    postedDate: '2024-01-18',
    description: 'Join our dynamic marketing team to drive brand growth and customer engagement...',
    requirements: [
      '3+ years in marketing role',
      'Experience with digital marketing campaigns',
      'Strong communication skills',
      'Bachelor\'s degree in Marketing or related field'
    ],
    benefits: [
      'Healthcare benefits',
      'Performance bonus',
      'Career development programs',
      'Staff purchase benefits'
    ],
    matchScore: 72,
    applicationDeadline: '2024-02-20',
    experienceLevel: 'Mid-level',
    category: 'Marketing',
    skills: ['Digital Marketing', 'Campaign Management', 'Analytics', 'Content Creation'],
    isVerified: true,
    applicants: 35,
    views: 567
  },
  {
    id: 'job-003',
    title: 'Operations Manager',
    company: 'MISC Berhad',
    companyLogo: '/api/placeholder/40/40',
    location: 'Port Klang',
    salary: 'RM 7,000 - 9,500',
    type: 'Full-time',
    workMode: 'On-site',
    postedDate: '2024-01-20',
    description: 'Lead our port operations team to ensure efficient and safe cargo handling...',
    requirements: [
      '7+ years in operations management',
      'Experience in logistics/shipping industry',
      'Strong leadership skills',
      'Knowledge of safety regulations'
    ],
    benefits: [
      'Comprehensive insurance',
      'Transport allowance',
      'Annual leave',
      'Professional certifications sponsorship'
    ],
    matchScore: 68,
    applicationDeadline: '2024-02-25',
    experienceLevel: 'Senior',
    category: 'Operations',
    skills: ['Operations Management', 'Logistics', 'Leadership', 'Safety Management'],
    isVerified: true,
    applicants: 22,
    views: 445
  },
  {
    id: 'job-004',
    title: 'UI/UX Designer',
    company: 'Grab Malaysia',
    companyLogo: '/api/placeholder/40/40',
    location: 'Petaling Jaya',
    salary: 'RM 5,500 - 8,000',
    type: 'Full-time',
    workMode: 'Hybrid',
    postedDate: '2024-01-22',
    description: 'Design intuitive and beautiful user experiences for millions of users...',
    requirements: [
      '4+ years of UI/UX design experience',
      'Proficiency in Figma and design systems',
      'Portfolio demonstrating user-centered design',
      'Experience with mobile app design'
    ],
    benefits: [
      'Stock options',
      'Grab credits',
      'Flexible work arrangements',
      'Wellness programs'
    ],
    matchScore: 78,
    applicationDeadline: '2024-02-28',
    experienceLevel: 'Mid-level',
    category: 'Design',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Mobile Design'],
    isVerified: true,
    applicants: 58,
    views: 1023
  },
  {
    id: 'job-005',
    title: 'Data Analyst',
    company: 'AirAsia',
    companyLogo: '/api/placeholder/40/40',
    location: 'Kuala Lumpur',
    salary: 'RM 4,000 - 6,500',
    type: 'Full-time',
    workMode: 'Hybrid',
    postedDate: '2024-01-23',
    description: 'Analyze flight and customer data to drive business insights and optimization...',
    requirements: [
      '2+ years in data analysis',
      'Proficiency in SQL and Python',
      'Experience with BI tools (Tableau/PowerBI)',
      'Strong analytical thinking'
    ],
    benefits: [
      'Free flights',
      'Medical insurance',
      'Annual bonus',
      'Casual dress code'
    ],
    matchScore: 81,
    applicationDeadline: '2024-03-01',
    experienceLevel: 'Junior to Mid',
    category: 'Data & Analytics',
    skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'Data Visualization'],
    isVerified: true,
    applicants: 41,
    views: 756
  }
];

export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Ahmad Rahman',
  email: 'ahmad.rahman@email.com',
  phone: '+60123456789',
  avatar: '/api/placeholder/100/100',
  role: 'jobseeker',
  location: 'Kuala Lumpur',
  bio: 'Experienced software engineer with passion for building scalable web applications',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Agile'],
  careerSignalScore: 72,
  profileCompleteness: 85,
  isVerified: true,
  experience: [
    {
      id: 'exp-001',
      company: 'TechCorp Malaysia',
      position: 'Full Stack Developer',
      startDate: '2021-03',
      current: true,
      description: 'Developing and maintaining web applications using React and Node.js',
      achievements: [
        'Reduced page load time by 40%',
        'Led migration to microservices architecture',
        'Mentored 3 junior developers'
      ]
    },
    {
      id: 'exp-002',
      company: 'Digital Solutions Sdn Bhd',
      position: 'Junior Developer',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      description: 'Built RESTful APIs and implemented frontend features',
      achievements: [
        'Developed customer portal serving 10k+ users',
        'Implemented automated testing reducing bugs by 30%'
      ]
    }
  ],
  education: [
    {
      id: 'edu-001',
      institution: 'University of Malaya',
      degree: 'Bachelor of Computer Science',
      field: 'Software Engineering',
      startDate: '2015-09',
      endDate: '2019-05',
      grade: 'First Class Honours'
    }
  ],
  certifications: [
    {
      id: 'cert-001',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      expiryDate: '2026-03',
      credentialId: 'AWS-123456',
      url: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-002',
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2022-08',
      credentialId: 'PSM-789012'
    }
  ],
  achievements: [
    {
      id: 'ach-001',
      title: 'Profile Completed',
      description: 'Completed 100% of your profile information',
      date: '2024-01-10',
      icon: '🏆',
      category: 'milestone'
    },
    {
      id: 'ach-002',
      title: 'Quick Responder',
      description: 'Responded to 5 employers within 24 hours',
      date: '2024-01-15',
      icon: '⚡',
      category: 'recognition'
    },
    {
      id: 'ach-003',
      title: 'Skill Master',
      description: 'Added 10+ verified skills to profile',
      date: '2024-01-08',
      icon: '🎯',
      category: 'skill'
    }
  ],
  preferences: {
    desiredSalary: 'RM 8,000 - 12,000',
    locations: ['Kuala Lumpur', 'Selangor', 'Penang'],
    jobTypes: ['Full-time'],
    workModes: ['Hybrid', 'Remote'],
    industries: ['Technology', 'Finance', 'E-commerce'],
    availability: 'Immediate'
  },
  documents: [
    {
      id: 'doc-001',
      name: 'Ahmad_Rahman_Resume.pdf',
      type: 'resume',
      url: '/documents/resume.pdf',
      uploadedDate: '2024-01-05'
    },
    {
      id: 'doc-002',
      name: 'AWS_Certificate.pdf',
      type: 'certificate',
      url: '/documents/aws-cert.pdf',
      uploadedDate: '2024-01-06'
    }
  ]
};

export const mockApplications: JobApplication[] = [
  {
    id: 'app-001',
    jobId: 'job-001',
    job: mockJobListings[0],
    appliedDate: '2024-01-16',
    status: 'Interview',
    matchScore: 85,
    nextSteps: 'Technical interview scheduled',
    interviewDate: '2024-02-05',
    interviewLocation: 'Petronas Twin Towers, Level 42',
    notes: 'Prepare for system design questions',
    timeline: [
      {
        date: '2024-01-16',
        status: 'Applied',
        description: 'Application submitted successfully',
        icon: '📤'
      },
      {
        date: '2024-01-18',
        status: 'Reviewing',
        description: 'Application under review by hiring team',
        icon: '👀'
      },
      {
        date: '2024-01-22',
        status: 'Interview',
        description: 'Invited for technical interview',
        icon: '📅'
      }
    ]
  },
  {
    id: 'app-002',
    jobId: 'job-004',
    job: mockJobListings[3],
    appliedDate: '2024-01-23',
    status: 'Reviewing',
    matchScore: 78,
    timeline: [
      {
        date: '2024-01-23',
        status: 'Applied',
        description: 'Application submitted',
        icon: '📤'
      },
      {
        date: '2024-01-24',
        status: 'Reviewing',
        description: 'Profile viewed by hiring manager',
        icon: '👀'
      }
    ]
  },
  {
    id: 'app-003',
    jobId: 'job-005',
    job: mockJobListings[4],
    appliedDate: '2024-01-24',
    status: 'Applied',
    matchScore: 81,
    timeline: [
      {
        date: '2024-01-24',
        status: 'Applied',
        description: 'Application received',
        icon: '📤'
      }
    ]
  }
];

export const mockCareerEvents: CareerEvent[] = [
  {
    id: 'event-001',
    title: 'MYFutureJobs Career Carnival 2024',
    type: 'Career Fair',
    date: '2024-03-12',
    endDate: '2024-03-14',
    location: 'Kuala Lumpur Convention Centre',
    description: 'Malaysia\'s largest career fair with 120+ employers and on-spot interviews',
    image: '/api/placeholder/400/250',
    organizer: 'PERKESO',
    registeredCount: 3842,
    capacity: 5000,
    isRegistered: true,
    tags: ['All Industries', 'Walk-in Interviews', 'Fresh Graduates Welcome'],
    speakers: ['Dato\' Sri Ahmad', 'Dr. Siti Nurhaliza'],
    partners: ['JobStreet', 'LinkedIn', 'HRDF'],
    agenda: [
      '9:00 AM - Registration & Welcome',
      '10:00 AM - Keynote: Future of Work',
      '11:00 AM - Employer Booths Open',
      '2:00 PM - Panel: Skills for Tomorrow',
      '4:00 PM - Networking Session'
    ]
  },
  {
    id: 'event-002',
    title: 'Industrial Automation Bootcamp',
    type: 'Training',
    date: '2024-02-20',
    location: 'Penang Skills Development Centre',
    description: '4-week intensive training on PLC programming and industrial IoT',
    image: '/api/placeholder/400/250',
    organizer: 'PSDC',
    registeredCount: 28,
    capacity: 30,
    isRegistered: false,
    tags: ['Technical Skills', 'HRDC Claimable', 'Certificate'],
    speakers: ['Ir. Tan Wei Ming'],
    partners: ['Siemens', 'Bosch']
  },
  {
    id: 'event-003',
    title: 'Tech & Digital Hiring Day',
    type: 'Hiring Event',
    date: '2024-02-28',
    location: 'Cyberjaya Convention Centre',
    description: 'Connect with 30+ tech companies hiring for digital roles',
    image: '/api/placeholder/400/250',
    organizer: 'MDEC',
    registeredCount: 512,
    capacity: 800,
    isRegistered: false,
    tags: ['Tech', 'Startups', 'Immediate Hiring'],
    partners: ['Google', 'Microsoft', 'AWS']
  }
];

export const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: 'training-001',
    title: 'Full Stack Web Development',
    provider: 'NextAcademy',
    duration: '3 months',
    startDate: '2024-03-01',
    mode: 'Hybrid',
    price: 8500,
    isHRDCClaimable: true,
    description: 'Learn modern web development with React, Node.js, and cloud deployment',
    curriculum: [
      'HTML, CSS & JavaScript Fundamentals',
      'React & Redux',
      'Node.js & Express',
      'Database Design with MongoDB',
      'AWS Deployment',
      'Final Project'
    ],
    certification: 'Certified Full Stack Developer',
    rating: 4.8,
    reviews: 234,
    enrolled: 892,
    category: 'Technology',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
    level: 'Beginner'
  },
  {
    id: 'training-002',
    title: 'Digital Marketing Masterclass',
    provider: 'Digital Marketing Institute',
    duration: '6 weeks',
    startDate: '2024-02-15',
    mode: 'Online',
    price: 2800,
    isHRDCClaimable: true,
    description: 'Master digital marketing strategies from SEO to social media advertising',
    curriculum: [
      'SEO & SEM Fundamentals',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting'
    ],
    certification: 'Certified Digital Marketing Professional',
    rating: 4.6,
    reviews: 156,
    enrolled: 543,
    category: 'Marketing',
    skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Strategy'],
    level: 'Intermediate'
  },
  {
    id: 'training-003',
    title: 'Data Science with Python',
    provider: 'DataCamp Malaysia',
    duration: '4 months',
    startDate: '2024-03-15',
    mode: 'Online',
    price: 6500,
    isHRDCClaimable: true,
    description: 'Comprehensive data science program from basics to machine learning',
    curriculum: [
      'Python Programming',
      'Data Analysis with Pandas',
      'Data Visualization',
      'Statistical Analysis',
      'Machine Learning Basics',
      'Real-world Projects'
    ],
    certification: 'Data Science Professional Certificate',
    rating: 4.9,
    reviews: 412,
    enrolled: 1205,
    category: 'Data Science',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Statistics', 'Data Visualization'],
    level: 'Beginner'
  }
];

export const mockRewards: Reward[] = [
  {
    id: 'reward-001',
    title: 'Grab Transport Voucher',
    description: 'RM20 off your ride to interview',
    type: 'Transport',
    value: 20,
    expiryDate: '2024-03-31',
    code: 'INTERVIEW2024',
    isUsed: false,
    conditions: [
      'Valid for interview appointments only',
      'One-time use',
      'Valid in Klang Valley only'
    ],
    merchant: 'Grab'
  },
  {
    id: 'reward-002',
    title: 'Career Fair Meal Voucher',
    description: 'Free lunch at MYFutureJobs Career Carnival',
    type: 'Meal',
    value: 15,
    expiryDate: '2024-03-14',
    code: 'LUNCH2024',
    isUsed: false,
    conditions: [
      'Valid during event dates only',
      'Redeemable at food court'
    ]
  },
  {
    id: 'reward-003',
    title: '50% Training Discount',
    description: 'Half price on selected online courses',
    type: 'Training',
    value: 500,
    expiryDate: '2024-04-30',
    code: 'LEARN50',
    isUsed: false,
    conditions: [
      'Valid for selected courses only',
      'Cannot combine with other offers'
    ]
  }
];

export const mockEmployers: Employer[] = [
  {
    id: 'emp-001',
    companyName: 'Petronas Digital',
    logo: '/api/placeholder/80/80',
    industry: 'Technology',
    size: '1000-5000 employees',
    location: 'Kuala Lumpur',
    website: 'https://digital.petronas.com',
    description: 'Leading Malaysia\'s digital transformation in energy sector',
    benefits: [
      'Comprehensive medical coverage',
      'Annual bonus',
      'Flexible working arrangements',
      'Learning & development programs'
    ],
    culture: [
      'Innovation-driven',
      'Collaborative',
      'Growth-oriented',
      'Diverse & inclusive'
    ],
    vacancies: [
      {
        id: 'vac-001',
        jobId: 'job-001',
        status: 'Active',
        createdDate: '2024-01-15',
        applications: 47,
        views: 892,
        shortlisted: 12,
        interviewed: 5,
        offered: 1
      }
    ],
    isVerified: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'emp-002',
    companyName: 'Maybank',
    logo: '/api/placeholder/80/80',
    industry: 'Banking & Finance',
    size: '10000+ employees',
    location: 'Kuala Lumpur',
    website: 'https://maybank.com',
    description: 'Leading financial services group in Southeast Asia',
    benefits: [
      'Banking benefits',
      'Healthcare for family',
      'Career progression',
      'Work-life balance'
    ],
    culture: [
      'Customer-centric',
      'Professional growth',
      'Team collaboration',
      'Community focus'
    ],
    vacancies: [
      {
        id: 'vac-002',
        jobId: 'job-002',
        status: 'Active',
        createdDate: '2024-01-18',
        applications: 35,
        views: 567,
        shortlisted: 8,
        interviewed: 3,
        offered: 0
      }
    ],
    isVerified: true,
    rating: 4.3,
    reviews: 567
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-001',
    userId: 'user-001',
    profile: mockUserProfile,
    appliedDate: '2024-01-16',
    matchScore: 85,
    fitDimensions: [
      {
        dimension: 'Technical Skills',
        score: 90,
        description: 'Strong match in required technologies'
      },
      {
        dimension: 'Experience',
        score: 85,
        description: '5+ years relevant experience'
      },
      {
        dimension: 'Cultural Fit',
        score: 80,
        description: 'Values align with company culture'
      },
      {
        dimension: 'Leadership',
        score: 75,
        description: 'Demonstrated team leadership'
      },
      {
        dimension: 'Industry Knowledge',
        score: 70,
        description: 'Some experience in energy sector'
      }
    ],
    status: 'Shortlisted',
    notes: 'Strong technical background, schedule for technical interview',
    strengths: [
      'Proven track record in similar role',
      'Strong technical skills match',
      'Leadership experience',
      'Immediate availability'
    ],
    gaps: [
      'Limited experience in energy sector',
      'No experience with specific legacy systems'
    ],
    interviewQuestions: [
      'Describe your experience with microservices architecture',
      'How would you handle a critical production issue?',
      'Tell me about a time you mentored junior developers'
    ]
  }
];

// Helper functions for mock data

export const getJobById = (id: string): JobListing | undefined => {
  return mockJobListings.find(job => job.id === id);
};

export const getApplicationsByUserId = (userId: string): JobApplication[] => {
  return mockApplications;
};

export const getEventById = (id: string): CareerEvent | undefined => {
  return mockCareerEvents.find(event => event.id === id);
};

export const getTrainingById = (id: string): TrainingProgram | undefined => {
  return mockTrainingPrograms.find(training => training.id === id);
};

export const searchJobs = (query: string, filters?: any): JobListing[] => {
  let results = [...mockJobListings];

  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(job =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  }

  if (filters?.location) {
    results = results.filter(job =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters?.salary) {
    // Parse salary range and filter
  }

  if (filters?.type) {
    results = results.filter(job => job.type === filters.type);
  }

  if (filters?.workMode) {
    results = results.filter(job => job.workMode === filters.workMode);
  }

  return results;
};

// Mock API delay simulator
export const simulateApiCall = <T>(data: T, delay: number = 800): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Generate random match scores
export const generateMatchScore = (): number => {
  return Math.floor(Math.random() * 30) + 70; // Random score between 70-100
};

// Generate timeline for application
export const generateApplicationTimeline = (startDate: string): ApplicationTimeline[] => {
  const timeline: ApplicationTimeline[] = [
    {
      date: startDate,
      status: 'Applied',
      description: 'Application submitted',
      icon: '📤'
    }
  ];

  const statuses = ['Reviewing', 'Interview', 'Offered'];
  const days = [2, 7, 14];

  statuses.forEach((status, index) => {
    if (Math.random() > 0.5) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + days[index]);
      timeline.push({
        date: date.toISOString().split('T')[0],
        status,
        description: `Status updated to ${status}`,
        icon: status === 'Reviewing' ? '👀' : status === 'Interview' ? '📅' : '🎉'
      });
    }
  });

  return timeline;
};