import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useState } from "react";

import { EXPERIENCES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

import "react-vertical-timeline-component/style.min.css";

type ExperienceCardProps = {
  experience: (typeof EXPERIENCES)[number];
  index: number;
};

// Skill tags corresponding to each experience
const EXPERIENCE_TAGS: Record<string, string[]> = {
  "Infosys Springboard (Virtual 7.0)": [
    "Java",
    "Spring Boot",
    "RESTful APIs",
    "JWT & Security",
    "Hibernate / JPA",
    "MySQL",
  ],
  "MainCrafts Technology": [
    "HTML5",
    "CSS3 Grid/Flexbox",
    "JavaScript",
    "State Persistence",
    "Responsive Design",
  ],
};

// Experience Card with Dynamic Hover Animations
const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const tags = EXPERIENCE_TAGS[experience.company_name] || [];

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "transparent",
        padding: 0,
        boxShadow: "none",
        border: "none",
      }}
      contentArrowStyle={{
        borderRight: isHovered
          ? "9px solid #915eff"
          : "7px solid rgba(145, 94, 255, 0.3)",
        transition: "border 0.3s ease",
      }}
      date={experience.date}
      dateClassName="text-secondary text-sm font-semibold tracking-wide"
      iconStyle={{
        background: experience.iconBg,
        boxShadow: isHovered
          ? "0 0 0 4px #915eff, 0 0 25px rgba(145,94,255,0.7), 0 4px 12px rgba(0,0,0,0.5)"
          : "0 0 0 4px #232631, 0 2px 8px rgba(0,0,0,0.4)",
        transform: isHovered ? "scale(1.12)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      icon={
        <div
          className="flex justify-center items-center w-full h-full cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={experience.icon}
            alt={experience.company_name}
            className={`w-[60%] h-[60%] object-contain transition-transform duration-300 ${
              isHovered ? "rotate-6 scale-110" : ""
            }`}
          />
        </div>
      }
    >
      {/* Interactive Card Body with Multiple Hover Layers */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 ${
          isHovered
            ? "-translate-y-2 shadow-[0_20px_40px_-15px_rgba(145,94,255,0.35)]"
            : "shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Animated Gradient Border Layer */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            isHovered
              ? "opacity-100 bg-gradient-to-r from-[#915eff] via-[#00d2ff] to-[#2af598]"
              : "opacity-40 bg-gradient-to-r from-[#915eff]/30 via-white/10 to-[#915eff]/20"
          }`}
        />

        {/* Inner Card Background */}
        <div className="relative rounded-[15px] bg-[#16122b]/95 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between">
          {/* Subtle Diagonal Shimmer Sheen Beam on Hover */}
          <div
            className={`pointer-events-none absolute -inset-full h-[250%] w-[50%] z-20 block transform -rotate-45 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ${
              isHovered ? "translate-x-[450%]" : "-translate-x-full"
            }`}
          />

          {/* Top Header & Role */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#915eff]/15 text-[#bfa3ff] border border-[#915eff]/30 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2af598] animate-ping" />
                <span>Internship #{index + 1}</span>
              </span>
              <h3 className="text-white text-[20px] sm:text-[23px] font-bold leading-snug tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#cbb7ff] group-hover:to-white transition-all duration-300">
                {experience.title}
              </h3>
              <p className="text-[#915eff] group-hover:text-[#00d2ff] text-[14px] sm:text-[16px] font-semibold mt-1 transition-colors duration-200">
                {experience.company_name}
              </p>
            </div>

            {/* Hover Indicator Sparkle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered
                  ? "bg-[#915eff] text-white shadow-lg shadow-[#915eff]/50 scale-110"
                  : "bg-white/5 text-secondary"
              }`}
            >
              <span className="text-xs">💼</span>
            </div>
          </div>

          {/* Key Deliverables Points with Micro-Interactions */}
          <ul className="mt-5 space-y-2.5">
            {experience.points.map((point, i) => (
              <li
                key={`experience-point-${i}`}
                className="group/item flex items-start gap-2.5 text-white-100 text-[13px] sm:text-[14px] leading-relaxed transition-all duration-200 hover:translate-x-1.5"
              >
                <span className="text-[#915eff] group-hover/item:text-[#2af598] transition-colors duration-200 text-sm mt-0.5 shrink-0">
                  ✦
                </span>
                <span className="group-hover/item:text-white transition-colors duration-150">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* Interactive Technology Skill Pills on Hover */}
          {tags.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="px-2.5 py-1 rounded-md text-[11px] sm:text-[12px] font-medium bg-[#1d1836] text-[#c4b5fd] border border-[#915eff]/20 hover:border-[#915eff] hover:bg-[#915eff] hover:text-white hover:scale-105 transition-all duration-200 cursor-default shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

// Experience Component
export const Experience = () => {
  return (
    <SectionWrapper idName="work">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I have done so far</p>
          <h2 className={styles.sectionHeadText}>Work Experience.</h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mt-10 flex flex-col">
          <VerticalTimeline lineColor="rgba(145,94,255,0.25)">
            {EXPERIENCES.map((experience, i) => (
              <ExperienceCard key={i} index={i} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </>
    </SectionWrapper>
  );
};

export default Experience;
