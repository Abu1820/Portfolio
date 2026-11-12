import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useEffect, useState } from "react";

import { CERTIFICATIONS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

type CertItem = (typeof CERTIFICATIONS)[number];

const SealMedal = ({ type }: { type: "gold" | "red" | "blue" }) => {
  const sealStyles = {
    gold: "from-[#f9d423] via-[#ff4e50] to-[#f5af19] shadow-amber-500/50",
    red: "from-[#ff416c] via-[#ff4b2b] to-[#b31217] shadow-red-500/50",
    blue: "from-[#2193b0] via-[#6dd5ed] to-[#1e3c72] shadow-cyan-500/50",
  };

  return (
    <div
      className={`absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${sealStyles[type]} shadow-lg flex items-center justify-center border-2 border-white/60`}
      title="Verified Credential Medal"
    >
      <span className="text-white text-sm sm:text-base drop-shadow">★</span>
    </div>
  );
};

const CertificateCard = ({
  cert,
  enableTilt,
  index,
}: {
  cert: CertItem;
  enableTilt: boolean;
  index: number;
}) => {
  const cardContent = (
    <div className="relative w-full h-full p-1.5 rounded-2xl bg-gradient-to-br from-[#dfba56] via-[#c59b27] to-[#8d6917] shadow-2xl group hover:shadow-amber-500/20 transition-all duration-300">
      {/* Inner Cream Parchment Card */}
      <div className="relative w-full h-full bg-gradient-to-br from-[#fefdfa] via-[#fbf8f0] to-[#f4eedb] rounded-[14px] p-6 sm:p-7 flex flex-col justify-between border border-[#e6cca1] overflow-hidden">
        {/* Subtle Diagonal Security Lines Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10px)",
          }}
        />

        {/* Golden Inner Frame */}
        <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-[#d4af37]/40" />

        {/* Decorative Corner Accents */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#b8860b]" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#b8860b]" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#b8860b]" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#b8860b]" />

        {/* Seal Medal */}
        <SealMedal type={cert.badgeType} />

        {/* Certificate Content */}
        <div className="relative z-10 pt-2 text-center">
          {/* Certificate Main Title */}
          <h3 className="text-[#1a1a1a] font-black text-[16px] sm:text-[18px] tracking-[0.12em] uppercase font-serif">
            {cert.title}
          </h3>

          {/* Golden Separator */}
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#c59b27] to-transparent mx-auto my-3" />

          {/* Topic / Course Name */}
          <p className="text-[#2b251e] italic text-[14px] sm:text-[15px] font-serif leading-relaxed px-2 min-h-[46px] flex items-center justify-center">
            "{cert.subtitle}"
          </p>

          {/* Score & Distinction */}
          <div className="mt-4 pt-3 border-t border-[#e2d5b8]">
            <p className="text-[#1a1a1a] font-bold text-[13px] tracking-wide">
              {cert.score}
            </p>
            <p className="text-[#107c41] font-extrabold text-[12px] tracking-wider mt-0.5">
              {cert.grade}
            </p>
          </div>
        </div>

        {/* Footer Details */}
        <div className="relative z-10 mt-5 pt-3 border-t border-[#e2d5b8] flex flex-col items-center justify-center text-center">
          <p className="text-[#4a4237] text-[11px] font-medium tracking-wide">
            {cert.issuer}
          </p>
          <div className="mt-1 flex items-center justify-between w-full text-[10px] text-[#6b5f4f]">
            <span>{cert.date}</span>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#92600a] hover:text-[#b8860b] font-bold underline transition duration-150 inline-flex items-center gap-0.5"
              >
                <span>Verify</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.75)} className="flex">
      {enableTilt ? (
        <Tilt
          options={{ max: 20, scale: 1.02, speed: 400, gyroscope: false }}
          className="w-full sm:w-[350px] lg:w-[370px] min-h-[340px] flex"
        >
          {cardContent}
        </Tilt>
      ) : (
        <div className="w-full sm:w-[350px] lg:w-[370px] min-h-[340px] flex">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
};

export const Certifications = () => {
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
    <SectionWrapper idName="certifications">
      {/* Title */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Verified Credentials &amp; Honors</p>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#2af598] via-[#009efd] to-[#2af598] font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] tracking-wide">
          CERTIFICATIONS.
        </h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-3 text-secondary text-[15px] sm:text-[17px] leading-7 w-full"
        >
          Professional certifications and online training credentials earned from premier institutions
          including IIT Kharagpur (NPTEL), Infosys Springboard, Kerala Blockchain Academy, and CodeChef.
        </motion.p>
      </div>

      {/* Certifications Cards Grid */}
      <div className="mt-14 flex flex-wrap gap-7 justify-center sm:justify-start">
        {CERTIFICATIONS.map((cert, i) => (
          <CertificateCard
            key={cert.title + i}
            cert={cert}
            enableTilt={enableTilt}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Certifications;
