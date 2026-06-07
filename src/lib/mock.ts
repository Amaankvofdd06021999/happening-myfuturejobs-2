import person1 from "@/assets/person-1.jpg";
import person2 from "@/assets/person-2.jpg";
import person3 from "@/assets/person-3.jpg";
import person4 from "@/assets/person-4.jpg";

export const jobseekerUser = { name: "Nurul A.", role: "Jobseeker · Marketing", avatar: person1 };
export const employerUser = { name: "Suresh K.", role: "Petronas Digital · HR Lead", avatar: person4 };
export const officerUser = { name: "Officer Lim", role: "PERKESO · Klang Branch", avatar: person2 };

export const jobs = [
  { id: "j1", title: "Senior Marketing Executive", company: "Petronas Digital", loc: "Kuala Lumpur", pay: "RM 6,000 – 8,500", type: "Full-time", match: 94, posted: "2d", logo: "🟢" },
  { id: "j2", title: "Brand Specialist", company: "AirAsia", loc: "Sepang", pay: "RM 5,500 – 7,200", type: "Full-time", match: 88, posted: "5h", logo: "🔴" },
  { id: "j3", title: "Digital Campaign Lead", company: "Maybank", loc: "KL Sentral", pay: "RM 7,000 – 9,000", type: "Hybrid", match: 81, posted: "1w", logo: "🟡" },
  { id: "j4", title: "Content Strategist", company: "Astro", loc: "Bukit Jalil", pay: "RM 4,800 – 6,200", type: "Full-time", match: 76, posted: "3d", logo: "🔵" },
];

export const candidates = [
  { id: "c1", name: "Aisyah Rahman", avatar: person3, role: "Software Engineer", exp: "5 yrs", loc: "Cyberjaya", fit: 92, top: "Technical Skills" },
  { id: "c2", name: "Daniel Tan", avatar: person2, role: "Software Engineer", exp: "6 yrs", loc: "Penang", fit: 88, top: "Experience" },
  { id: "c3", name: "Priya Krishnan", avatar: person1, role: "Senior Engineer", exp: "8 yrs", loc: "KL", fit: 84, top: "Leadership" },
  { id: "c4", name: "Mr. Suresh", avatar: person4, role: "Tech Lead", exp: "10 yrs", loc: "Subang", fit: 79, top: "Leadership" },
];
