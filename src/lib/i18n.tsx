import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Translation data for all languages
const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.findJobs": "Find Jobs",
    "nav.applications": "Applications",
    "nav.careerSignal": "Career Signal",
    "nav.careerPathway": "Career Pathway",
    "nav.cvPositioning": "CV Positioning",
    "nav.cvEdits": "CV Edits",
    "nav.events": "Events & Training",
    "nav.community": "Community",
    "nav.rewards": "Rewards",
    "nav.profile": "My Profile",
    "nav.vacancies": "Vacancies",
    "nav.company": "Company",

    // Auth
    "auth.signIn": "Sign in",
    "auth.signUp": "Create account",
    "auth.welcomeBack": "Welcome back to MYFutureJobs",
    "auth.chooseRole": "Choose how you're signing in",
    "auth.logout": "Logout",

    // Roles
    "role.jobseeker": "Jobseeker",
    "role.employer": "Employer",
    "role.officer": "Case Officer",
    "role.jobseekerDesc": "Find jobs, build your profile, use Career Assistant.",
    "role.employerDesc": "Post vacancies, screen candidates with Hiring Assistant.",
    "role.officerDesc": "PERKESO staff — LDAP/SSO, RBAC, Research Hub.",

    // Landing Page
    "landing.title": "Find work that fits you",
    "landing.subtitle": "Malaysia's national employment portal connecting 500,000+ jobseekers with 50,000+ verified employers. AI-powered matching, upskilling programs, and career growth tools.",
    "landing.searchPlaceholder": "Job title, skills, or company",
    "landing.locationPlaceholder": "City or state",
    "landing.searchButton": "Search jobs",
    "landing.forJobseekers": "For Jobseekers",
    "landing.forEmployers": "For Employers",
    "landing.activeJobseekers": "Active Jobseekers",
    "landing.verifiedEmployers": "Verified Employers",
    "landing.jobsPosted": "Jobs Posted",
    "landing.successfulPlacements": "Successful Placements",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.careerScore": "Career Signal Score",
    "dashboard.profileViews": "Profile Views",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.recommendedJobs": "Recommended for You",
    "dashboard.upcomingEvents": "Upcoming Events",
    "dashboard.quickActions": "Quick Actions",

    // Jobs
    "jobs.applyNow": "Apply Now",
    "jobs.save": "Save",
    "jobs.saved": "Saved",
    "jobs.matchScore": "Match",
    "jobs.postedAgo": "Posted",
    "jobs.viewDetails": "View Details",
    "jobs.requirements": "Requirements",
    "jobs.description": "Job Description",
    "jobs.benefits": "Salary & Benefits",
    "jobs.location": "Office Location",

    // Community
    "community.title": "Community Hub",
    "community.subtitle": "Connect, learn, and grow with Malaysia's professional community",
    "community.feed": "Feed",
    "community.groups": "Groups",
    "community.events": "Events",
    "community.mentors": "Mentors",
    "community.activeMembers": "Active Members",
    "community.discussionGroups": "Discussion Groups",
    "community.upcomingEvents": "Upcoming Events",
    "community.successStories": "Success Stories",
    "community.joinGroup": "Join Group",
    "community.register": "Register",
    "community.connect": "Connect",
    "community.available": "Available",
    "community.busy": "Busy",

    // Career Pathway
    "pathway.title": "Career Pathway Explorer",
    "pathway.subtitle": "Visualize your career journey and plan your next steps",
    "pathway.selectPath": "Select Career Path",
    "pathway.progression": "Career Progression",
    "pathway.current": "CURRENT",
    "pathway.keySkills": "Key Skills",
    "pathway.certifications": "Recommended Certifications",
    "pathway.alternativePaths": "Alternative Career Paths",
    "pathway.recommendedLearning": "Recommended Learning",
    "pathway.skillGap": "Skill Gap Analysis",
    "pathway.milestones": "Upcoming Milestones",
    "pathway.aiCoach": "AI Career Coach",
    "pathway.startSession": "Start Coaching Session",

    // Mobile App
    "mobile.title": "Your Career On-the-Go",
    "mobile.subtitle": "Access MYFutureJobs anytime, anywhere",
    "mobile.downloadTitle": "Download the MYFutureJobs App",
    "mobile.downloadDesc": "Take your career journey with you wherever you go. Get instant job alerts, apply on-the-go, and track your applications from your mobile device.",
    "mobile.features": "Mobile App Features",
    "mobile.pushNotifications": "Push Notifications",
    "mobile.pushDesc": "Get instant alerts for new job matches",
    "mobile.quickApply": "Quick Apply",
    "mobile.quickApplyDesc": "Apply to jobs in seconds with saved profiles",
    "mobile.offlineAccess": "Offline Access",
    "mobile.offlineDesc": "View saved jobs and profiles without internet",
    "mobile.geoSearch": "Location-Based Search",
    "mobile.geoDesc": "Find opportunities near your current location",
    "mobile.voiceSearch": "Voice Search",
    "mobile.voiceDesc": "Search for jobs using voice commands",
    "mobile.biometric": "Biometric Security",
    "mobile.biometricDesc": "Secure login with fingerprint or Face ID",
    "mobile.downloadNow": "Download Now",
    "mobile.scanQR": "Scan QR Code to Download",

    // CV Positioning
    "cv.positioning.title": "CV Positioning Analysis",
    "cv.positioning.uploadCV": "Upload Your CV",
    "cv.positioning.analyzing": "Analyzing your CV...",
    "cv.positioning.score": "Overall Score",
    "cv.positioning.keywords": "Keyword Match",
    "cv.positioning.formatting": "Formatting",
    "cv.positioning.completeness": "Completeness",
    "cv.positioning.recommendations": "Recommendations",
    "cv.positioning.improve": "How to Improve",

    // Applications
    "applications.title": "My Applications",
    "applications.status": "Application Status",
    "applications.pending": "Pending Review",
    "applications.reviewing": "Under Review",
    "applications.shortlisted": "Shortlisted",
    "applications.interviewed": "Interviewed",
    "applications.offered": "Job Offered",
    "applications.rejected": "Not Selected",
    "applications.withdrawn": "Withdrawn",
    "applications.viewJob": "View Job",
    "applications.withdraw": "Withdraw Application",

    // Events
    "events.title": "Events & Training",
    "events.upcoming": "Upcoming Events",
    "events.past": "Past Events",
    "events.register": "Register",
    "events.registered": "Registered",
    "events.capacity": "Capacity",
    "events.online": "Online Event",
    "events.physical": "Physical Event",
    "events.hybrid": "Hybrid Event",
    "events.certificate": "Certificate Provided",

    // Rewards
    "rewards.title": "My Rewards",
    "rewards.points": "Points",
    "rewards.badges": "Badges",
    "rewards.achievements": "Achievements",
    "rewards.redeem": "Redeem",
    "rewards.history": "Reward History",
    "rewards.earnMore": "Earn More Points",

    // Profile
    "profile.title": "My Profile",
    "profile.basicInfo": "Basic Information",
    "profile.experience": "Work Experience",
    "profile.education": "Education",
    "profile.skills": "Skills",
    "profile.languages": "Languages",
    "profile.preferences": "Job Preferences",
    "profile.visibility": "Profile Visibility",
    "profile.completeness": "Profile Completeness",
    "profile.edit": "Edit Profile",
    "profile.save": "Save Changes",

    // Employer
    "employer.dashboard": "Employer Dashboard",
    "employer.postJob": "Post New Job",
    "employer.candidates": "Candidates",
    "employer.screening": "AI Screening",
    "employer.interviews": "Interviews",
    "employer.analytics": "Analytics",
    "employer.subscription": "Subscription",
    "employer.credits": "Job Credits",

    // Officer
    "officer.dashboard": "Officer Dashboard",
    "officer.activeCases": "Active Cases",
    "officer.closedCases": "Closed Cases",
    "officer.jobseekers": "Jobseekers",
    "officer.employers": "Employers",
    "officer.reports": "Reports",
    "officer.analytics": "Analytics",

    // Common
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.viewAll": "See all",
    "common.viewLess": "View less",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.retry": "Try again",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.save": "Save",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.settings": "Settings",
    "common.help": "Help & Support",
    "common.notifications": "Notifications",
    "common.language": "Language",
    "common.darkMode": "Dark Mode",
    "common.lightMode": "Light Mode",
    "common.poweredBy": "Powered by 360°",
  },
  ms: {
    // Navigation
    "nav.dashboard": "Papan Pemuka",
    "nav.findJobs": "Cari Kerja",
    "nav.applications": "Permohonan",
    "nav.careerSignal": "Isyarat Kerjaya",
    "nav.careerPathway": "Laluan Kerjaya",
    "nav.cvPositioning": "Kedudukan CV",
    "nav.cvEdits": "Edit CV",
    "nav.events": "Acara & Latihan",
    "nav.community": "Komuniti",
    "nav.rewards": "Ganjaran",
    "nav.profile": "Profil Saya",
    "nav.vacancies": "Kekosongan",
    "nav.company": "Syarikat",

    // Auth
    "auth.signIn": "Log masuk",
    "auth.signUp": "Daftar akaun",
    "auth.welcomeBack": "Selamat kembali ke MYFutureJobs",
    "auth.chooseRole": "Pilih cara anda log masuk",
    "auth.logout": "Log keluar",

    // Roles
    "role.jobseeker": "Pencari Kerja",
    "role.employer": "Majikan",
    "role.officer": "Pegawai Kes",
    "role.jobseekerDesc": "Cari kerja, bina profil anda, gunakan Pembantu Kerjaya.",
    "role.employerDesc": "Siarkan kekosongan, tapis calon dengan Pembantu Pengambilan.",
    "role.officerDesc": "Kakitangan PERKESO — LDAP/SSO, RBAC, Pusat Penyelidikan.",

    // Landing Page
    "landing.title": "Cari kerja yang sesuai untuk anda",
    "landing.subtitle": "Portal pekerjaan nasional Malaysia menghubungkan 500,000+ pencari kerja dengan 50,000+ majikan yang disahkan. Padanan berkuasa AI, program peningkatan kemahiran, dan alat pertumbuhan kerjaya.",
    "landing.searchPlaceholder": "Tajuk kerja, kemahiran, atau syarikat",
    "landing.locationPlaceholder": "Bandar atau negeri",
    "landing.searchButton": "Cari kerja",
    "landing.forJobseekers": "Untuk Pencari Kerja",
    "landing.forEmployers": "Untuk Majikan",
    "landing.activeJobseekers": "Pencari Kerja Aktif",
    "landing.verifiedEmployers": "Majikan Disahkan",
    "landing.jobsPosted": "Kerja Disiarkan",
    "landing.successfulPlacements": "Penempatan Berjaya",

    // Dashboard
    "dashboard.welcome": "Selamat kembali",
    "dashboard.careerScore": "Skor Isyarat Kerjaya",
    "dashboard.profileViews": "Paparan Profil",
    "dashboard.recentActivity": "Aktiviti Terkini",
    "dashboard.recommendedJobs": "Disyorkan untuk Anda",
    "dashboard.upcomingEvents": "Acara Akan Datang",
    "dashboard.quickActions": "Tindakan Pantas",

    // Jobs
    "jobs.applyNow": "Mohon Sekarang",
    "jobs.save": "Simpan",
    "jobs.saved": "Disimpan",
    "jobs.matchScore": "Padanan",
    "jobs.postedAgo": "Disiarkan",
    "jobs.viewDetails": "Lihat Butiran",
    "jobs.requirements": "Keperluan",
    "jobs.description": "Huraian Kerja",
    "jobs.benefits": "Gaji & Faedah",
    "jobs.location": "Lokasi Pejabat",

    // Community
    "community.title": "Hab Komuniti",
    "community.subtitle": "Berhubung, belajar, dan berkembang dengan komuniti profesional Malaysia",
    "community.feed": "Suapan",
    "community.groups": "Kumpulan",
    "community.events": "Acara",
    "community.mentors": "Mentor",
    "community.activeMembers": "Ahli Aktif",
    "community.discussionGroups": "Kumpulan Perbincangan",
    "community.upcomingEvents": "Acara Akan Datang",
    "community.successStories": "Cerita Kejayaan",
    "community.joinGroup": "Sertai Kumpulan",
    "community.register": "Daftar",
    "community.connect": "Hubung",
    "community.available": "Tersedia",
    "community.busy": "Sibuk",

    // Career Pathway
    "pathway.title": "Penjelajah Laluan Kerjaya",
    "pathway.subtitle": "Visualisasi perjalanan kerjaya anda dan rancang langkah seterusnya",
    "pathway.selectPath": "Pilih Laluan Kerjaya",
    "pathway.progression": "Kemajuan Kerjaya",
    "pathway.current": "SEMASA",
    "pathway.keySkills": "Kemahiran Utama",
    "pathway.certifications": "Pensijilan Disyorkan",
    "pathway.alternativePaths": "Laluan Kerjaya Alternatif",
    "pathway.recommendedLearning": "Pembelajaran Disyorkan",
    "pathway.skillGap": "Analisis Jurang Kemahiran",
    "pathway.milestones": "Pencapaian Akan Datang",
    "pathway.aiCoach": "Jurulatih Kerjaya AI",
    "pathway.startSession": "Mulakan Sesi Jurulatih",

    // Mobile App
    "mobile.title": "Kerjaya Anda Dalam Genggaman",
    "mobile.subtitle": "Akses MYFutureJobs bila-bila masa, di mana sahaja",
    "mobile.downloadTitle": "Muat Turun Aplikasi MYFutureJobs",
    "mobile.downloadDesc": "Bawa perjalanan kerjaya anda ke mana sahaja. Dapatkan makluman kerja segera, mohon dengan pantas, dan jejaki permohonan anda dari peranti mudah alih.",
    "mobile.features": "Ciri-ciri Aplikasi Mudah Alih",
    "mobile.pushNotifications": "Pemberitahuan Push",
    "mobile.pushDesc": "Dapatkan makluman segera untuk padanan kerja baharu",
    "mobile.quickApply": "Mohon Pantas",
    "mobile.quickApplyDesc": "Mohon kerja dalam beberapa saat dengan profil tersimpan",
    "mobile.offlineAccess": "Akses Luar Talian",
    "mobile.offlineDesc": "Lihat kerja dan profil tersimpan tanpa internet",
    "mobile.geoSearch": "Carian Berasaskan Lokasi",
    "mobile.geoDesc": "Cari peluang berhampiran lokasi semasa anda",
    "mobile.voiceSearch": "Carian Suara",
    "mobile.voiceDesc": "Cari kerja menggunakan arahan suara",
    "mobile.biometric": "Keselamatan Biometrik",
    "mobile.biometricDesc": "Log masuk selamat dengan cap jari atau Face ID",
    "mobile.downloadNow": "Muat Turun Sekarang",
    "mobile.scanQR": "Imbas Kod QR untuk Muat Turun",

    // CV Positioning
    "cv.positioning.title": "Analisis Kedudukan CV",
    "cv.positioning.uploadCV": "Muat Naik CV Anda",
    "cv.positioning.analyzing": "Menganalisis CV anda...",
    "cv.positioning.score": "Skor Keseluruhan",
    "cv.positioning.keywords": "Padanan Kata Kunci",
    "cv.positioning.formatting": "Pemformatan",
    "cv.positioning.completeness": "Kelengkapan",
    "cv.positioning.recommendations": "Cadangan",
    "cv.positioning.improve": "Cara Meningkatkan",

    // Applications
    "applications.title": "Permohonan Saya",
    "applications.status": "Status Permohonan",
    "applications.pending": "Menunggu Semakan",
    "applications.reviewing": "Dalam Semakan",
    "applications.shortlisted": "Tersenarai Pendek",
    "applications.interviewed": "Ditemuduga",
    "applications.offered": "Tawaran Kerja",
    "applications.rejected": "Tidak Dipilih",
    "applications.withdrawn": "Ditarik Balik",
    "applications.viewJob": "Lihat Kerja",
    "applications.withdraw": "Tarik Balik Permohonan",

    // Events
    "events.title": "Acara & Latihan",
    "events.upcoming": "Acara Akan Datang",
    "events.past": "Acara Lepas",
    "events.register": "Daftar",
    "events.registered": "Telah Daftar",
    "events.capacity": "Kapasiti",
    "events.online": "Acara Dalam Talian",
    "events.physical": "Acara Fizikal",
    "events.hybrid": "Acara Hibrid",
    "events.certificate": "Sijil Disediakan",

    // Rewards
    "rewards.title": "Ganjaran Saya",
    "rewards.points": "Mata",
    "rewards.badges": "Lencana",
    "rewards.achievements": "Pencapaian",
    "rewards.redeem": "Tebus",
    "rewards.history": "Sejarah Ganjaran",
    "rewards.earnMore": "Dapatkan Lebih Mata",

    // Profile
    "profile.title": "Profil Saya",
    "profile.basicInfo": "Maklumat Asas",
    "profile.experience": "Pengalaman Kerja",
    "profile.education": "Pendidikan",
    "profile.skills": "Kemahiran",
    "profile.languages": "Bahasa",
    "profile.preferences": "Keutamaan Kerja",
    "profile.visibility": "Keterlihatan Profil",
    "profile.completeness": "Kelengkapan Profil",
    "profile.edit": "Edit Profil",
    "profile.save": "Simpan Perubahan",

    // Employer
    "employer.dashboard": "Papan Pemuka Majikan",
    "employer.postJob": "Siarkan Kerja Baharu",
    "employer.candidates": "Calon",
    "employer.screening": "Saringan AI",
    "employer.interviews": "Temuduga",
    "employer.analytics": "Analitik",
    "employer.subscription": "Langganan",
    "employer.credits": "Kredit Kerja",

    // Officer
    "officer.dashboard": "Papan Pemuka Pegawai",
    "officer.activeCases": "Kes Aktif",
    "officer.closedCases": "Kes Ditutup",
    "officer.jobseekers": "Pencari Kerja",
    "officer.employers": "Majikan",
    "officer.reports": "Laporan",
    "officer.analytics": "Analitik",

    // Common
    "common.search": "Cari",
    "common.filter": "Tapis",
    "common.sort": "Susun",
    "common.viewAll": "Lihat semua",
    "common.viewLess": "Lihat kurang",
    "common.loading": "Memuatkan...",
    "common.error": "Sesuatu tidak kena",
    "common.retry": "Cuba lagi",
    "common.cancel": "Batal",
    "common.confirm": "Sahkan",
    "common.delete": "Padam",
    "common.edit": "Edit",
    "common.save": "Simpan",
    "common.close": "Tutup",
    "common.back": "Kembali",
    "common.next": "Seterusnya",
    "common.previous": "Sebelumnya",
    "common.submit": "Hantar",
    "common.settings": "Tetapan",
    "common.help": "Bantuan & Sokongan",
    "common.notifications": "Pemberitahuan",
    "common.language": "Bahasa",
    "common.darkMode": "Mod Gelap",
    "common.lightMode": "Mod Cerah",
    "common.poweredBy": "Dikuasakan oleh 360°",
  },
  zh: {
    // Navigation
    "nav.dashboard": "仪表板",
    "nav.findJobs": "找工作",
    "nav.applications": "申请",
    "nav.careerSignal": "职业信号",
    "nav.careerPathway": "职业路径",
    "nav.cvPositioning": "简历定位",
    "nav.cvEdits": "简历编辑",
    "nav.events": "活动与培训",
    "nav.community": "社区",
    "nav.rewards": "奖励",
    "nav.profile": "我的资料",
    "nav.vacancies": "职位空缺",
    "nav.company": "公司",

    // Auth
    "auth.signIn": "登录",
    "auth.signUp": "创建账户",
    "auth.welcomeBack": "欢迎回到 MYFutureJobs",
    "auth.chooseRole": "选择您的登录方式",
    "auth.logout": "登出",

    // Roles
    "role.jobseeker": "求职者",
    "role.employer": "雇主",
    "role.officer": "案件专员",
    "role.jobseekerDesc": "寻找工作，建立您的个人资料，使用职业助手。",
    "role.employerDesc": "发布职位空缺，使用招聘助手筛选候选人。",
    "role.officerDesc": "PERKESO 员工 — LDAP/SSO，RBAC，研究中心。",

    // Common
    "common.search": "搜索",
    "common.filter": "筛选",
    "common.viewAll": "查看全部",
    "common.loading": "加载中...",
    "common.error": "出了点问题",
    "common.retry": "重试",
    "common.close": "关闭",
    "common.settings": "设置",
    "common.help": "帮助与支持",
    "common.notifications": "通知",
    "common.poweredBy": "由 360° 提供支持",
  },
  ta: {
    // Navigation
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.findJobs": "வேலை தேடு",
    "nav.applications": "விண்ணப்பங்கள்",
    "nav.careerSignal": "தொழில் சமிக்ஞை",
    "nav.careerPathway": "தொழில் பாதை",
    "nav.cvPositioning": "சிவி நிலைப்பாடு",
    "nav.cvEdits": "சிவி திருத்தங்கள்",
    "nav.events": "நிகழ்வுகள் & பயிற்சி",
    "nav.community": "சமூகம்",
    "nav.rewards": "வெகுமதிகள்",
    "nav.profile": "என் சுயவிவரம்",
    "nav.vacancies": "காலியிடங்கள்",
    "nav.company": "நிறுவனம்",

    // Auth
    "auth.signIn": "உள்நுழைய",
    "auth.signUp": "கணக்கு உருவாக்கு",
    "auth.welcomeBack": "MYFutureJobs க்கு மீண்டும் வரவேற்கிறோம்",
    "auth.chooseRole": "நீங்கள் எப்படி உள்நுழைகிறீர்கள் என்பதைத் தேர்வுசெய்க",
    "auth.logout": "வெளியேறு",

    // Roles
    "role.jobseeker": "வேலை தேடுபவர்",
    "role.employer": "முதலாளி",
    "role.officer": "வழக்கு அதிகாரி",
    "role.jobseekerDesc": "வேலைகளைக் கண்டறியவும், உங்கள் சுயவிவரத்தை உருவாக்கவும், தொழில் உதவியாளரைப் பயன்படுத்தவும்.",
    "role.employerDesc": "காலியிடங்களை இடுகையிடவும், பணியமர்த்தல் உதவியாளருடன் வேட்பாளர்களை திரையிடவும்.",
    "role.officerDesc": "PERKESO ஊழியர்கள் — LDAP/SSO, RBAC, ஆராய்ச்சி மையம்.",

    // Common
    "common.search": "தேடு",
    "common.filter": "வடிகட்டு",
    "common.viewAll": "அனைத்தையும் பார்",
    "common.loading": "ஏற்றுகிறது...",
    "common.error": "ஏதோ தவறு நடந்தது",
    "common.retry": "மீண்டும் முயற்சிக்கவும்",
    "common.close": "மூடு",
    "common.settings": "அமைப்புகள்",
    "common.help": "உதவி & ஆதரவு",
    "common.notifications": "அறிவிப்புகள்",
    "common.poweredBy": "360° மூலம் இயக்கப்படுகிறது",
  }
};

// Language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        localStorage.setItem("language", language);
      }
      // Update document language attribute
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations];
    return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use translations
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}