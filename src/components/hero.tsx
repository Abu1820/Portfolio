import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { styles } from "../styles";
import { cn } from "../utils/lib";

const ROLES = [
  "Java Backend Architect",
  "Spring Boot & REST API Specialist",
  "Competitive Programmer (400+ LeetCode)",
  "Seed-Funded System Creator",
  "AI Recommendation Systems Co-Author",
];

const STATS = [
  { target: 400, suffix: "+", label: "LeetCode Solved" },
  { target: 9.03, suffix: "", label: "College CGPA", isDecimal: true },
  { target: 2, suffix: "x", label: "Coding Awards" },
  { target: 1, suffix: "", label: "Kindle Book" },
];

// Typewriter Subtitle
const Typewriter = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        const nextText = currentFullText.slice(0, displayText.length + 1);
        setDisplayText(nextText);
        if (nextText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        // Deleting
        const nextText = currentFullText.slice(0, displayText.length - 1);
        setDisplayText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center text-[#915eff] font-semibold">
      <span>{displayText}</span>
      <span className="w-0.5 h-5 bg-[#915eff] ml-1 animate-pulse" />
    </span>
  );
};

// Animated Number Counter
const AnimatedCounter = ({
  target,
  suffix,
  isDecimal,
}: {
  target: number;
  suffix: string;
  isDecimal?: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(isDecimal ? Math.round(start * 100) / 100 : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [target, isDecimal]);

  return (
    <span>
      {isDecimal ? count.toFixed(2) : count}
      {suffix}
    </span>
  );
};

// Hero Component
export const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-screen mx-auto touch-pan-y overflow-hidden flex flex-col justify-between pt-28 sm:pt-36 pb-10">
      <div
        className={cn(
          styles.paddingX,
          "max-w-7xl mx-auto w-full flex flex-row items-start gap-5 z-10",
        )}
      >
        {/* Accent bar */}
        <div className="flex flex-col justify-center items-center mt-5 shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-44 violet-gradient" />
        </div>

        {/* Hero text */}
        <div className="max-w-4xl">
          <h1 className="font-black text-white xl:text-[68px] lg:text-[56px] sm:text-[46px] xs:text-[36px] text-[30px] xl:leading-[82px] lg:leading-[70px] sm:leading-[58px] leading-[40px] mt-2 tracking-tight">
            <span>Hi, I'm </span>
            <span className="text-[#915eff] whitespace-nowrap inline-block">
              Abdul Majeed R
            </span>
          </h1>

          {/* Dynamic Typewriter Subtitle */}
          <div className="mt-2 text-[18px] sm:text-[24px] font-medium text-white-100 min-h-[32px] sm:min-h-[36px] flex items-center">
            <span className="text-secondary mr-2">I am a</span>
            <Typewriter />
          </div>

          <p className="mt-2 text-secondary text-[14px] sm:text-[16px] max-w-xl leading-relaxed">
            Specializing in high-throughput Java backend systems, Spring Boot microservices,
            and scalable web platforms engineered for performance.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#915eff] hover:bg-[#7b46e3] text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-[#915eff]/30 transition duration-200 inline-flex items-center gap-2 text-sm"
            >
              View Resume ↗
            </a>
            <a
              href="#projects"
              className="border border-[#915eff] text-white hover:bg-[#915eff]/15 font-semibold py-2.5 px-6 rounded-xl transition duration-200 inline-flex items-center text-sm"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="border border-white/20 text-white hover:bg-white/10 font-semibold py-2.5 px-6 rounded-xl transition duration-200 inline-flex items-center text-sm"
            >
              Get in Touch
            </a>
          </div>

          {/* Animated Metrics Counter Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-6 sm:gap-10 pt-6 border-t border-white/10"
          >
            {STATS.map((stat, i) => (
              <div key={`stat-${i}`} className="flex flex-col">
                <span className="text-white font-extrabold text-[22px] sm:text-[28px] tracking-tight text-[#915eff]">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </span>
                <span className="text-secondary text-[11px] sm:text-[12px] font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="w-full flex justify-center items-center pt-10 pb-4 z-10">
        <a href="#about" aria-label="Scroll to About">
          <div className="w-9 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2 hover:border-[#915eff] transition duration-200">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
