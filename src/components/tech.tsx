import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";
import { useInView } from "../hooks/use-in-view";
import { useLimitedWebGL } from "../hooks/use-limited-webgl";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

type TechBallProps = {
  name: string;
  icon: string;
};

const TechBall = ({ name, icon }: TechBallProps) => (
  <div className="w-full h-full flex items-center justify-center">
    <div
      className="relative w-20 h-20 xs:w-24 xs:h-24 rounded-full flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 32% 28%, #efe6d4 0%, #ddd0b8 52%, #c4b49a 100%)",
        boxShadow: [
          "inset 5px 5px 12px rgba(255, 248, 235, 0.28)",
          "inset -8px -10px 16px rgba(55, 42, 28, 0.22)",
          "0 12px 20px -8px rgba(0, 0, 0, 0.4)",
        ].join(", "),
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 left-5 h-5 w-7 rounded-full bg-[#f5efe3]/25 blur-[2px]"
      />
      <img
        src={icon}
        alt={name}
        className="relative z-10 w-10 h-10 xs:w-12 xs:h-12 object-contain"
      />
    </div>
  </div>
);

export const Tech = () => {
  const { ref, isInView } = useInView();
  const limitedWebGL = useLimitedWebGL();
  const use3DBalls = isInView && !limitedWebGL;

  return (
    <SectionWrapper idName="skills">
      {/* Section Header */}
      <motion.div variants={textVariant()} className="mb-10 text-center sm:text-left">
        <p className={styles.sectionSubText}>Interactive 3D Stack & Tools</p>
        <h2 className={styles.sectionHeadText}>Skills & Technologies.</h2>
      </motion.div>

      <div
        ref={ref}
        className="flex flex-row flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10"
      >
        {TECHNOLOGIES.map((technology) => (
          <div
            className="flex flex-col items-center justify-center group"
            key={technology.name}
          >
            {/* Ball or Fallback */}
            <div className="tech-ball-wrapper w-24 h-24 xs:w-28 xs:h-28">
              {use3DBalls ? (
                <BallCanvas icon={technology.icon} />
              ) : (
                <TechBall name={technology.name} icon={technology.icon} />
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
