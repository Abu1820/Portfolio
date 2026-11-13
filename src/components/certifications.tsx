import { AnimatePresence, motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

// Certificate Modal Preview (Lightbox)
const CertificateModal = ({
  cert,
  onClose,
}: {
  cert: CertItem;
  onClose: () => void;
}) => {
  // Close on Escape key press & lock body scroll without layout shift
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#0f141c] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-500/20 bg-gradient-to-r from-[#171e2b] via-[#111722] to-[#171e2b]">
          <div className="flex items-center gap-3 pr-4">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base tracking-wide">
                {cert.title}
              </h3>
              <p className="text-[#a4b3c6] text-xs sm:text-sm italic">
                {cert.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg font-bold shrink-0"
            aria-label="Close Certificate Preview"
          >
            ✕
          </button>
        </div>

        {/* Certificate Image View */}
        <div className="p-3 sm:p-5 overflow-auto flex-1 flex items-center justify-center bg-[#07090e]">
          <img
            src={cert.image}
            alt={`${cert.title} - ${cert.subtitle}`}
            className="max-h-[64vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>

        {/* Modal Action Footer */}
        <div className="px-5 py-3.5 border-t border-amber-500/20 bg-[#111722] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="text-secondary">
            <span className="font-semibold text-white/90">{cert.issuer}</span>
            <span className="mx-2">•</span>
            <span>{cert.date}</span>
            {cert.credentialId && (
              <>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="hidden sm:inline font-mono text-[#f3ba2f]">
                  {cert.credentialId}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={cert.image}
              target="_blank"
              rel="noreferrer noopener"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition duration-150 inline-flex items-center gap-1.5"
            >
              <span>Full Image</span>
              <span>↗</span>
            </a>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold transition duration-150 inline-flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Verify Credential</span>
                <span>↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-gray-700/60 hover:bg-gray-700 text-white font-medium transition duration-150"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const CertificateCard = ({
  cert,
  enableTilt,
  index,
  onOpenModal,
}: {
  cert: CertItem;
  enableTilt: boolean;
  index: number;
  onOpenModal: () => void;
}) => {
  const cardContent = (
    <div
      onClick={onOpenModal}
      className="relative w-full h-full p-1.5 rounded-2xl bg-gradient-to-br from-[#dfba56] via-[#c59b27] to-[#8d6917] shadow-2xl group hover:shadow-amber-500/30 transition-all duration-300 cursor-pointer"
    >
      {/* Inner Dark Glassmorphic Prestigious Card */}
      <div className="relative w-full h-full bg-gradient-to-br from-[#181335] via-[#151030] to-[#0d0a20] rounded-[14px] p-6 sm:p-7 flex flex-col justify-between border border-[#d4af37]/30 overflow-hidden shadow-inner">
        {/* Subtle Diagonal Security Lines Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 10px)",
          }}
        />

        {/* Golden Inner Frame */}
        <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-[#d4af37]/25" />

        {/* Decorative Corner Accents */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]/70" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]/70" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]/70" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]/70" />

        {/* Seal Medal */}
        <SealMedal type={cert.badgeType} />

        {/* Certificate Content */}
        <div className="relative z-10 pt-2 text-center">
          {/* Certificate Main Title */}
          <h3 className="text-white font-extrabold text-[16px] sm:text-[18px] tracking-[0.08em] uppercase group-hover:text-amber-300 transition duration-200">
            {cert.title}
          </h3>

          {/* Golden Separator */}
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-3" />

          {/* Topic / Course Name */}
          <p className="text-[#dfd9ff] italic text-[14px] sm:text-[15px] leading-relaxed px-2 min-h-[46px] flex items-center justify-center">
            "{cert.subtitle}"
          </p>

          {/* Score & Distinction */}
          <div className="mt-4 pt-3 border-t border-[#d4af37]/20">
            <p className="text-white font-bold text-[13px] tracking-wide">
              {cert.score}
            </p>
            <p className="text-[#2af598] font-extrabold text-[12px] tracking-wider mt-0.5">
              {cert.grade}
            </p>
          </div>
        </div>

        {/* Interactive Click Prompt Pill */}
        <div className="relative z-10 my-2 flex justify-center">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#d4af37]/15 text-amber-300 border border-[#d4af37]/30 group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-200 flex items-center gap-1.5 shadow-sm">
            <span>🔍 Click to View Certificate</span>
          </span>
        </div>

        {/* Footer Details */}
        <div className="relative z-10 pt-2 border-t border-[#d4af37]/20 flex flex-col items-center justify-center text-center">
          <p className="text-secondary text-[11px] font-medium tracking-wide">
            {cert.issuer}
          </p>
          <div className="mt-1 flex items-center justify-between w-full text-[10px] text-secondary/80">
            <span>{cert.date}</span>
            {cert.verifyUrl && (
              <span className="text-amber-400 font-bold inline-flex items-center gap-0.5">
                <span>Verified</span>
                <span>✓</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.25, 0.75)} className="flex">
      {enableTilt ? (
        <Tilt
          options={{ max: 18, scale: 1.02, speed: 400, gyroscope: false }}
          className="w-full sm:w-[350px] lg:w-[370px] min-h-[360px] flex"
        >
          {cardContent}
        </Tilt>
      ) : (
        <div className="w-full sm:w-[350px] lg:w-[370px] min-h-[360px] flex">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
};

export const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
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
        <h2 className={styles.sectionHeadText}>Certifications.</h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-3 text-secondary text-[15px] sm:text-[17px] leading-7 w-full"
        >
          Professional certifications and online credentials earned from premier institutions
          including IIT Kharagpur (NPTEL), Infosys Springboard, Kerala Blockchain Academy, and CodeChef.
          Click any certificate to open its high-resolution verification modal.
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
            onOpenModal={() => setSelectedCert(cert)}
          />
        ))}
      </div>

      {/* Interactive Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default Certifications;
