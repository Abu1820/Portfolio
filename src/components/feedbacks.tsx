import { motion } from "framer-motion";

import { TESTIMONIALS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type FeedbackCardProps = {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
};

// Feedback Card
const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}: FeedbackCardProps) => (
  <motion.div
    variants={fadeIn(undefined, "spring", index * 0.4, 0.75)}
    className="achievement-card bg-black-200 p-7 sm:p-10 rounded-3xl w-full xs:w-[300px] sm:w-[320px] border border-secondary/10 hover:border-[#915eff]/50 hover:shadow-lg hover:shadow-[#915eff]/10 transition duration-300"
  >
    {/* Award badge */}
    <p className="text-[#915eff] font-black text-[28px] sm:text-[32px]">🏆</p>

    <div className="mt-1">
      {/* Description */}
      <p className="text-white tracking-wide text-[13px] sm:text-[15px] leading-relaxed">
        {testimonial}
      </p>

      <div className="mt-6 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <p className="text-white font-bold text-[14px] sm:text-[16px]">
            <span className="blue-text-gradient">#</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[11px] sm:text-[12px]">
            {designation} • {company}
          </p>
        </div>

        {/* Profile Image */}
        <img
          src={image}
          alt={`badge-${name}`}
          className="w-10 h-10 rounded-full object-cover border border-[#915eff]"
        />
      </div>
    </div>
  </motion.div>
);

// Feedbacks
export const Feedbacks = () => {
  return (
    <SectionWrapper idName="achievements">
      <div className="mt-12 bg-black-100 rounded-[20px]">
        <div
          className={cn(
            styles.padding,
            "bg-tertiary rounded-2xl min-h-[200px] sm:min-h-[300px]",
          )}
        >
          {/* Title */}
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Recognition &amp; Milestones</p>
            <h2 className={styles.sectionHeadText}>Key Achievements.</h2>
          </motion.div>
        </div>

        {/* Achievement Cards */}
        <div
          className={cn(styles.paddingX, "-mt-16 sm:-mt-20 pb-10 sm:pb-14 flex flex-wrap gap-5 sm:gap-7 justify-center sm:justify-start")}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <FeedbackCard key={testimonial.name} index={i} {...testimonial} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
