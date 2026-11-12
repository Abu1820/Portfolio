import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { SERVICES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

type ServiceCardProps = {
  index: number;
  title: string;
  icon: string;
};

// Service Card
const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  const [enableTilt, setEnableTilt] = useState(
    () => window.matchMedia("(min-width: 640px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setEnableTilt(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const card = (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-8 min-h-[220px] sm:min-h-[280px] flex justify-evenly items-center flex-col">
        <img src={icon} alt={title} className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
        <h3 className="text-white text-[17px] sm:text-[20px] font-bold text-center leading-snug">
          {title}
        </h3>
      </div>
    </motion.div>
  );

  return enableTilt ? (
    <Tilt
      options={{ max: 25, scale: 1.02, speed: 450 }}
      className="w-full xs:w-[220px] sm:w-[250px]"
    >
      {card}
    </Tilt>
  ) : (
    <div className="w-full xs:w-[220px] sm:w-[250px]">{card}</div>
  );
};

// Interactive LeetCode & DSA Problem Solving Showcase
const DsaShowcase = () => {
  const topics = [
    { name: "Arrays & Strings", count: "120+", pct: 90, color: "from-[#915eff] to-[#bf61ff]" },
    { name: "Hashing & Sliding Window", count: "90+", pct: 85, color: "from-[#00cea8] to-[#11998e]" },
    { name: "Sorting, Searching & Two Pointers", count: "80+", pct: 80, color: "from-[#56ccf2] to-[#2f80ed]" },
    { name: "Trees, Graphs & Heaps", count: "70+", pct: 75, color: "from-[#f5af19] to-[#f12711]" },
    { name: "Dynamic Programming & Recursion", count: "40+", pct: 60, color: "from-[#ec008c] to-[#fc6767]" },
  ];

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      className="mt-16 w-full green-pink-gradient p-[1px] rounded-3xl shadow-card"
    >
      <div className="bg-tertiary rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-secondary/15">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-400 text-lg">⚡</span>
              <span className="text-[#915eff] text-xs font-bold uppercase tracking-wider">
                Algorithmic Mastery
              </span>
            </div>
            <h3 className="text-white font-extrabold text-[22px] sm:text-[26px]">
              Competitive Programming &amp; DSA Proficiency
            </h3>
            <p className="text-secondary text-[14px] mt-1">
              Active problem solver with 400+ problems solved across data structures, sorting algorithms, and system architecture.
            </p>
          </div>

          {/* LeetCode Profile Button */}
          <a
            href="https://leetcode.com/u/Abu18/"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-[#050816] hover:bg-[#915eff] text-white border border-[#915eff]/40 hover:border-transparent font-bold py-2.5 px-5 rounded-xl shadow-lg transition duration-200 inline-flex items-center gap-2 text-sm whitespace-nowrap min-h-0 min-w-0"
          >
            <span className="text-amber-400 font-extrabold">⬡</span>
            <span>View LeetCode Profile (@Abu18)</span>
            <span>↗</span>
          </a>
        </div>

        {/* Breakdown Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Problem Distribution */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
              <span>📊</span> Topic-wise Distribution
            </h4>
            <div className="space-y-3.5">
              {topics.map((topic, i) => (
                <div key={`topic-${i}`} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white-100">{topic.name}</span>
                    <span className="text-secondary">{topic.count}</span>
                  </div>
                  <div className="w-full h-2 bg-black-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${topic.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${topic.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contest Achievements */}
          <div className="bg-black-200/60 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                <span>🏆</span> Competitive Milestones
              </h4>
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-tertiary/70 border border-secondary/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">CIT CRYPTERA 2026</span>
                    <span className="text-amber-400 font-extrabold text-xs bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      🥇 1st Prize
                    </span>
                  </div>
                  <p className="text-secondary text-xs mt-1">
                    First place in Technical Puzzle Clash covering Operating Systems, DBMS &amp; Computer Networks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-tertiary/70 border border-secondary/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">IEEE CodeQuest 2026</span>
                    <span className="text-[#56ccf2] font-extrabold text-xs bg-[#56ccf2]/10 px-2 py-0.5 rounded border border-[#56ccf2]/30">
                      🥈 2nd Prize
                    </span>
                  </div>
                  <p className="text-secondary text-xs mt-1">
                    Secured 2nd place in tournament covering Logic Sprint, HackerRank Arena &amp; Mystery Code.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-secondary">
              <span>Overall Rating: Top 15%</span>
              <span className="text-emerald-400 font-bold">● Active Streak</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// About Component
export const About = () => {
  return (
    <SectionWrapper idName="about">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>

        {/* Body */}
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-4 text-secondary text-[15px] sm:text-[17px] leading-[28px] sm:leading-[30px] w-full"
        >
          I'm a Computer Science and Engineering undergraduate at KPRIET (CGPA: 9.03) with a strong
          foundation in Java, Spring Boot, MySQL, REST APIs, and Data Structures &amp; Algorithms.
          With 400+ problems solved on LeetCode and virtual internships at Infosys Springboard and
          MainCrafts Technology, I specialize in building secure, scalable backend architectures,
          full-stack platforms like CivicPulse and Uniora, and co-authoring publications in AI &amp;
          recommendation systems.
        </motion.p>

        {/* Service Cards */}
        <div className="mt-14 flex flex-wrap gap-6 justify-center sm:justify-start">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} index={i} {...service} />
          ))}
        </div>

        {/* Interactive LeetCode & DSA Showcase */}
        <DsaShowcase />
      </>
    </SectionWrapper>
  );
};

export default About;
