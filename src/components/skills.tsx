import { motion } from "framer-motion";

import {
  java,
  python,
  c,
  mysql,
  postman,
  html,
  css,
  javascript,
  springboot,
  git,
} from "../assets";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

// Custom vector icons for skills not in default png assets
const OopIcon = () => (
  <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const DsaIcon = () => (
  <svg className="w-8 h-8 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="6" cy="6" r="3" strokeWidth={1.8} />
    <circle cx="18" cy="6" r="3" strokeWidth={1.8} />
    <circle cx="12" cy="18" r="3" strokeWidth={1.8} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.5 7.5L10.5 15M15.5 7.5L13.5 15" />
  </svg>
);

const SqlIcon = () => (
  <svg className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3C6.477 3 2 4.343 2 6v12c0 1.657 4.477 3 10 3s10-1.343 10-3V6c0-1.657-4.477-3-10-3zm0 2c4.418 0 8 .985 8 2s-3.582 2-8 2-8-.985-8-2 3.582-2 8-2zm-8 4.672C5.69 10.428 8.653 11 12 11s6.31-.572 8-1.328V12c0 1.015-3.582 2-8 2s-8-.985-8-2V9.672zm0 5C5.69 15.428 8.653 16 12 16s6.31-.572 8-1.328V17c0 1.015-3.582 2-8 2s-8-.985-8-2v-2.328z"/>
  </svg>
);

const PowerBiIcon = () => (
  <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="12" width="4" height="9" rx="1.5" fill="#f2c811" />
    <rect x="10" y="7" width="4" height="14" rx="1.5" fill="#f2c811" />
    <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#f2c811" />
  </svg>
);

const ExcelIcon = () => (
  <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#107c41" />
    <path d="M7 7h10v10H7z" fill="#fff" fillOpacity="0.2"/>
    <path d="M8.5 7.5L11 12l-2.5 4.5h2.2l1.3-2.6 1.3 2.6h2.2L13 12l2.5-4.5h-2.2l-1.3 2.6-1.3-2.6H8.5z" fill="#fff"/>
  </svg>
);

const CanvaIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="url(#canva-gradient)" />
    <path d="M12.5 7c-3 0-5 2.2-5 5.2 0 3.2 2.2 4.8 5 4.8 2.2 0 3.8-1 4.5-2.2l-1.5-.9c-.5.8-1.6 1.4-3 1.4-1.8 0-3.2-1.1-3.3-2.8h7.8c.1-.4.1-.7.1-1.1 0-2.8-1.8-4.4-4.6-4.4zm-3.3 4c.2-1.5 1.4-2.5 3.2-2.5 1.6 0 2.8 1 3 2.5H9.2z" fill="#fff"/>
    <defs>
      <linearGradient id="canva-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00c4cc" />
        <stop offset="1" stopColor="#7d2ae8" />
      </linearGradient>
    </defs>
  </svg>
);

const VsCodeIcon = () => (
  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.6 2.1l-6.8 6.4L5.6 4.3c-.6-.4-1.3-.2-1.7.3L2.2 6.5c-.4.5-.3 1.2.2 1.6l4.6 3.9-4.6 3.9c-.5.4-.6 1.1-.2 1.6l1.7 1.9c.4.5 1.1.7 1.7.3l5.2-4.2 6.8 6.4c.5.5 1.3.5 1.8.1l3.8-2.6c.6-.4.8-1.1.8-1.8V3.9c0-.7-.2-1.4-.8-1.8l-3.8-2.6c-.5-.4-1.3-.4-1.8.1zM18 16.5l-5-4.5 5-4.5v9z"/>
  </svg>
);

type SkillItem = {
  name: string;
  icon?: string;
  customIcon?: React.ReactNode;
};

type SkillCategory = {
  title: string;
  countText: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  skills: SkillItem[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Core",
    countText: "5 skills",
    bgGradient: "bg-gradient-to-b from-[#062c1d]/90 via-[#042015]/90 to-[#02130c]/90",
    borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
    accentColor: "text-emerald-400",
    skills: [
      { name: "Java", icon: java },
      { name: "Python", icon: python },
      { name: "C", icon: c },
      { name: "OOP", customIcon: <OopIcon /> },
      { name: "DSA", customIcon: <DsaIcon /> },
    ],
  },
  {
    title: "Data & Design Tools",
    countText: "6 skills",
    bgGradient: "bg-gradient-to-b from-[#1b0b36]/90 via-[#130727]/90 to-[#0b0318]/90",
    borderColor: "border-purple-500/30 hover:border-purple-400/60",
    accentColor: "text-purple-400",
    skills: [
      { name: "SQL", customIcon: <SqlIcon /> },
      { name: "MySQL", icon: mysql },
      { name: "Power BI", customIcon: <PowerBiIcon /> },
      { name: "Excel", customIcon: <ExcelIcon /> },
      { name: "Canva", customIcon: <CanvaIcon /> },
      { name: "Postman", icon: postman },
    ],
  },
  {
    title: "Web Engineering",
    countText: "6 skills",
    bgGradient: "bg-gradient-to-b from-[#2e0917]/90 via-[#210610]/90 to-[#14030a]/90",
    borderColor: "border-rose-500/30 hover:border-rose-400/60",
    accentColor: "text-rose-400",
    skills: [
      { name: "HTML5", icon: html },
      { name: "CSS3", icon: css },
      { name: "JavaScript", icon: javascript },
      { name: "Spring Boot", icon: springboot },
      { name: "Git / GitHub", icon: git },
      { name: "VS Code", customIcon: <VsCodeIcon /> },
    ],
  },
];

export const Skills = () => {
  return (
    <SectionWrapper idName="skills">
      {/* Title */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Technical Proficiencies</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-3 text-secondary text-[15px] sm:text-[17px] leading-7 w-full"
        >
          Categorized overview of my core programming competencies, database management, analytical
          design utilities, and modern web engineering toolchains.
        </motion.p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((category, idx) => (
          <motion.div
            key={category.title}
            variants={fadeIn("up", "spring", idx * 0.3, 0.75)}
            className={`rounded-3xl p-7 sm:p-8 ${category.bgGradient} border ${category.borderColor} shadow-2xl transition-all duration-300 flex flex-col justify-between`}
          >
            <div>
              {/* Category Header */}
              <div className="text-center pb-6 border-b border-white/10">
                <h3 className="text-white font-extrabold text-[22px] sm:text-[24px] tracking-tight">
                  {category.title}
                </h3>
                <span className={`inline-block mt-1 text-xs font-semibold ${category.accentColor} tracking-wider`}>
                  {category.countText}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="mt-8 grid grid-cols-2 gap-y-7 gap-x-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center group cursor-pointer"
                  >
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center p-3 border border-white/10 shadow-lg group-hover:scale-110 group-hover:border-white/30 transition-all duration-200">
                      {skill.customIcon ? (
                        skill.customIcon
                      ) : (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                        />
                      )}
                    </div>

                    {/* Skill Label */}
                    <span className="mt-2.5 text-white/85 text-[13px] sm:text-[14px] font-semibold text-center group-hover:text-white transition duration-200">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
