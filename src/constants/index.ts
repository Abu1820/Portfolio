// Contains constant data for Abdul Majeed R's 3D Portfolio

import {
  mobile,
  backend,
  creator,
  web,
  java,
  python,
  c,
  springboot,
  mysql,
  postman,
  cloudflare,
  html,
  css,
  javascript,
  reactjs,
  git,
  sql,
  powerbi,
  canva,
  excel,
  vscode,
  dsa,
  oop,
  infosys,
  maincrafts,
  civicpulse,
  uniora,
  book,
  profile,
  linkedin,
  github,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "skills",
    title: "Skills",
    link: null,
  },
  {
    id: "work",
    title: "Experience",
    link: null,
  },
  {
    id: "projects",
    title: "Projects",
    link: null,
  },
  {
    id: "certifications",
    title: "Certifications",
    link: null,
  },
  {
    id: "publications",
    title: "Publications",
    link: null,
  },
  {
    id: "achievements",
    title: "Achievements",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  {
    id: "resume",
    title: "Resume ↗",
    link: "/resume.html",
  },
] as const;

// Services / Core Roles
export const SERVICES = [
  {
    title: "Java Backend Developer",
    icon: backend,
  },
  {
    title: "Spring Boot & REST APIs",
    icon: web,
  },
  {
    title: "Competitive Programmer (400+ LeetCode)",
    icon: creator,
  },
  {
    title: "Book Co-Author & AI Systems",
    icon: mobile,
  },
] as const;

// Technologies (used in 3D floating canvas balls)
export const TECHNOLOGIES = [
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Spring Boot",
    icon: springboot,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "C",
    icon: c,
  },
  {
    name: "DSA",
    icon: dsa,
  },
  {
    name: "OOP",
    icon: oop,
  },
  {
    name: "Power BI",
    icon: powerbi,
  },
  {
    name: "Excel",
    icon: excel,
  },
  {
    name: "Canva",
    icon: canva,
  },
  {
    name: "Git / GitHub",
    icon: git,
  },
  {
    name: "VS Code",
    icon: vscode,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "Java Backend Development Intern",
    company_name: "Infosys Springboard (Virtual 7.0)",
    icon: infosys,
    iconBg: "#007cc3",
    date: "June 2026 – August 2026",
    points: [
      "Engineered robust RESTful API endpoints in Java and Spring Boot for user management, issue tracking, and service workflows.",
      "Implemented secure stateless authentication and role-based access control (RBAC) using JWT and Spring Security.",
      "Integrated Spring Data JPA and Hibernate with MySQL, designing normalized database schemas and optimizing query execution.",
      "Earned official Infosys Java Foundation and Python Foundation professional certifications during the internship.",
    ],
  },
  {
    title: "Full Stack Web Development Intern",
    company_name: "MainCrafts Technology",
    icon: maincrafts,
    iconBg: "#0284c7",
    date: "June 2026 – July 2026",
    points: [
      "Completed a 4-week internship focused on frontend development and responsive web architecture.",
      "Developed responsive multi-page web interfaces using HTML5, CSS3 Flexbox/Grid, and vanilla JavaScript.",
      "Built an interactive contact form module with client-side state persistence using LocalStorage and dynamic form validation.",
      "Awarded an Internship Completion Certificate and a Letter of Recommendation upon timely completion.",
    ],
  },
] as const;

// Key Achievements & Recognition (Replaces generic Testimonials)
export const TESTIMONIALS = [
  {
    testimonial:
      "Won 1st Prize and ₹1,500 cash award in Technical Puzzle Clash covering Operating Systems, DBMS, and Computer Networks at CIT.",
    name: "1st Prize",
    designation: "CIT CRYPTERA 2026",
    company: "CIT Coimbatore",
    image: profile,
  },
  {
    testimonial:
      "Secured 2nd Place in competitive coding tournament (Logic Sprint, HackerRank Arena, Mystery Code) organized by IEEE Education Society.",
    name: "2nd Prize",
    designation: "IEEE CodeQuest",
    company: "IEEE Student Branch",
    image: profile,
  },
  {
    testimonial:
      "Project Uniora was selected for and awarded official institutional Seed Funding from KPRIET for social impact and technical innovation.",
    name: "Seed Funding",
    designation: "Project Uniora",
    company: "KPRIET Innovation Cell",
    image: profile,
  },
  {
    testimonial:
      "Solved 400+ problems across arrays, strings, hashing, sliding window, sorting, and heaps, maintaining consistent problem-solving proficiency.",
    name: "400+ Solved",
    designation: "LeetCode Specialist",
    company: "Competitive Programming",
    image: profile,
  },
] as const;

// Featured Projects
export const PROJECTS = [
  {
    name: "CivicPulse – Smart Governance",
    category: "Java & Full Stack",
    isLive: false,
    status: "Open Source Platform",
    description:
      "Full-stack civic reporting platform enabling citizens to report and track municipal issues like potholes and drainage. Built with Spring Boot, JWT security, Hibernate, MySQL, and React.",
    highlights: [
      "Engineered with Spring Boot 3, RESTful APIs, and Spring Security with stateless JWT token authentication.",
      "Integrated Spring Data JPA and Hibernate with MySQL, featuring normalized schemas and optimized queries.",
      "Citizen grievance reporting workflow with status tracking, geo-tagging, and automated administrative routing.",
      "Role-based access control (Citizen, Municipal Officer, Super Admin) with structured audit logging."
    ],
    tags: [
      {
        name: "springboot",
        color: "blue-text-gradient",
      },
      {
        name: "mysql",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
      {
        name: "jwt",
        color: "orange-text-gradient",
      },
    ],
    image: civicpulse,
    source_code_link: "https://github.com/Abu1820/CivicPulse",
    live_site_link: "https://github.com/Abu1820/CivicPulse",
  },
  {
    name: "Uniora – Welfare Schemes Platform",
    category: "Cloud & Edge Systems",
    isLive: true,
    status: "Live Production Deployment",
    description:
      "Eligibility-matching engine mapping citizens to applicable government welfare schemes. Seed-funded by KPRIET, architected with Cloudflare Workers edge caching and Supabase for offline accessibility.",
    highlights: [
      "Awarded institutional Seed Funding by KPRIET Innovation Cell for community impact and technical merit.",
      "Rule-based eligibility evaluation engine matching citizen demographics to state and central schemes.",
      "Serverless edge architecture deployed on Cloudflare Workers ensuring sub-50ms worldwide response times.",
      "Supabase PostgreSQL data layer configured with row-level security policies and resilient caching."
    ],
    tags: [
      {
        name: "cloudflare-workers",
        color: "orange-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: uniora,
    source_code_link: "https://github.com/Abu1820/UNIORA",
    live_site_link: "https://uni-ora.uniora-official.workers.dev/dashboard/",
  },
] as const;

// Publications / Authored Books
export const PUBLICATIONS = [
  {
    title: "Mastering Recommendation Systems: From Basics to Breakthroughs",
    subtitle:
      "A Complete Guide to AI-Powered Recommendation Systems – From Fundamental Techniques to Advanced Deep Learning",
    authors: "Co-authored by Abdul Majeed R",
    publisher: "Amazon Kindle Edition",
    description:
      "A comprehensive technical book exploring algorithmic recommendation frameworks, collaborative filtering, matrix factorization, and advanced deep learning breakthroughs in modern AI systems.",
    image: book,
    link: "https://amzn.in/d/j7muHtb",
    tags: [
      {
        name: "amazon-kindle",
        color: "orange-text-gradient",
      },
      {
        name: "deep-learning",
        color: "blue-text-gradient",
      },
      {
        name: "ai-systems",
        color: "pink-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
    ],
  },
] as const;

// Professional Certifications (Verified Credentials)
export const CERTIFICATIONS = [
  {
    id: "nptel-industry4",
    title: "NPTEL ONLINE CERTIFICATION",
    subtitle: "Introduction to Industry 4.0 and Industrial Internet of Things",
    issuer: "IIT Kharagpur & Swayam (Funded by MoE, Govt. of India)",
    score: "Score: 80% (Assignments: 24.78/25 | Exam: 55.5/75)",
    grade: "Elite Certificate (19,100 candidates certified)",
    badgeType: "gold" as const,
    date: "Jul – Oct 2025 (12 Weeks)",
    credentialId: "Roll No: NPTEL25CS146S970900013",
    verifyUrl: "https://nptel.ac.in",
    image: "/certifications/nptel-industry4.jpg",
  },
  {
    id: "infosys-java",
    title: "INFOSYS SPRINGBOARD",
    subtitle: "Java Foundation Certification",
    issuer: "Infosys Limited (Springboard Navigate Your Next)",
    score: "Certificate of Achievement",
    grade: "Completed on Saturday, May 2, 2026",
    badgeType: "red" as const,
    date: "May 2, 2026",
    credentialId: "Infosys Springboard Verified",
    verifyUrl: "https://verify.onwingspan.com",
    image: "/certifications/infosys-java.jpg",
  },
  {
    id: "infosys-python",
    title: "INFOSYS SPRINGBOARD",
    subtitle: "Python Foundation Certification",
    issuer: "Infosys Limited (Springboard Navigate Your Next)",
    score: "Certificate of Achievement",
    grade: "Completed on Saturday, June 13, 2026",
    badgeType: "gold" as const,
    date: "June 13, 2026",
    credentialId: "Infosys Springboard Verified",
    verifyUrl: "https://verify.onwingspan.com",
    image: "/certifications/infosys-python.jpg",
  },
  {
    id: "kba-blockchain",
    title: "KERALA BLOCKCHAIN ACADEMY",
    subtitle: "Certified Blockchain Associate (CBA ONLINE)",
    issuer: "Kerala Blockchain Academy (KBA) & MLG Blockchain",
    score: "LF Decentralized Trust Partner Program",
    grade: "Certified Blockchain Associate",
    badgeType: "blue" as const,
    date: "March 30, 2026",
    credentialId: "IIITMK-KBA-CBA-OL-46447",
    verifyUrl: "https://verify.kba.ai",
    image: "/certifications/kba-blockchain.jpg",
  },
  {
    id: "codechef-java",
    title: "CODECHEF CERTIFICATION",
    subtitle: "Learn Java",
    issuer: "CodeChef Pro Learning (Hrishikesh Kelkar, Business Head)",
    score: "Certificate of Completion",
    grade: "Completed all lessons & projects",
    badgeType: "gold" as const,
    date: "18th July 2026",
    credentialId: "Certificate ID: d71b75d (User: kpr24cs004)",
    verifyUrl: "https://www.codechef.com/certificates/verify",
    image: "/certifications/codechef-java.jpg",
  },
] as const;

// Social Links
export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: linkedin,
    link: "https://www.linkedin.com/in/abdulmajeedr/",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/Abu1820",
  },
] as const;
