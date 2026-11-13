import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";
import { useInView } from "../hooks/use-in-view";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

export const Tech = () => {
  const { ref, isInView } = useInView({ rootMargin: "300px" });

  return (
    <SectionWrapper idName="skills">
      {/* Section Header */}
      <motion.div variants={textVariant()} className="mb-10 text-center sm:text-left">
        <p className={styles.sectionSubText}>Interactive 3D Stack & Tools</p>
        <h2 className={styles.sectionHeadText}>Skills & Technologies.</h2>
      </motion.div>

      <div
        ref={ref}
        className="flex flex-row flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10 min-h-[300px]"
      >
        {TECHNOLOGIES.map((technology) => (
          <div
            className="flex flex-col items-center justify-center group"
            key={technology.name}
          >
            {/* 3D Ball Canvas rendered on all screen sizes & mobile */}
            <div className="tech-ball-wrapper w-24 h-24 xs:w-28 xs:h-28 rounded-full overflow-hidden flex items-center justify-center">
              {isInView && (
                <BallCanvas icon={technology.icon} name={technology.name} />
              )}
            </div>

            {/* Tech Name */}
            <p className="mt-2 text-secondary text-[12px] xs:text-[13px] sm:text-[14px] font-medium tracking-wide text-center group-hover:text-[#915eff] transition duration-200">
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Tech;
