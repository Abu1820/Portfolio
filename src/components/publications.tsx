import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useEffect, useState } from "react";

import { PUBLICATIONS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

export const Publications = () => {
  const [enableTilt, setEnableTilt] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnableTilt(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <SectionWrapper idName="publications">
      {/* Title */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Research &amp; Writing</p>
        <h2 className={styles.sectionHeadText}>Publications.</h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-3 text-secondary text-[15px] sm:text-[17px] leading-7 w-full"
        >
          Co-authored technical work covering AI-powered recommendation systems,
          collaborative filtering, and deep learning architectures published globally
          on Amazon Kindle.
        </motion.p>
      </div>

      {/* Publications Showcase */}
      <div className="mt-12 flex flex-col gap-10">
        {PUBLICATIONS.map((pub, idx) => (
          <motion.div
            key={`pub-${idx}`}
            variants={fadeIn("up", "spring", idx * 0.5, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-3xl shadow-card"
          >
            <div className="bg-tertiary rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
              {/* Book Cover */}
              {enableTilt ? (
                <Tilt
                  options={{ max: 25, scale: 1.05, speed: 400 }}
                  className="w-full md:w-64 shrink-0 flex justify-center"
                >
                  <BookCover pub={pub} />
                </Tilt>
              ) : (
                <div className="w-full md:w-64 shrink-0 flex justify-center">
                  <BookCover pub={pub} />
                </div>
              )}

              {/* Publication Details */}
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="bg-[#915eff]/20 text-[#915eff] border border-[#915eff]/40 text-xs px-3 py-1 rounded-full font-medium">
                      {pub.publisher}
                    </span>
                    <span className="text-secondary text-xs font-medium break-words">
                      {pub.authors}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-[18px] sm:text-[22px] leading-tight">
                    {pub.title}
                  </h3>

                  <p className="mt-2 text-[#915eff] text-sm font-medium italic">
                    "{pub.subtitle}"
                  </p>

                  <p className="mt-3 text-secondary text-[13px] sm:text-[15px] leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-secondary/10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag, tagIdx) => (
                      <span
                        key={`pub-tag-${tagIdx}`}
                        className={cn(tag.color, "text-xs font-medium")}
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Amazon Button */}
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bg-[#915eff] hover:bg-[#7b46e3] text-white font-bold py-2.5 px-5 sm:px-6 rounded-xl shadow-lg transition duration-200 text-sm flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Read on Amazon Kindle</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// Extracted for reuse
function BookCover({ pub }: { pub: (typeof PUBLICATIONS)[number] }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl border-2 border-[#915eff]/30">
      <img
        src={pub.image}
        alt={pub.title}
        loading="lazy"
        className="w-52 sm:w-64 h-72 sm:h-84 object-cover rounded-2xl transition duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
        <span className="text-white text-xs font-semibold bg-[#915eff] px-3 py-1 rounded-full">
          Amazon Kindle
        </span>
      </div>
    </div>
  );
}

export default Publications;
