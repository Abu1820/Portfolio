import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { github, preview } from "../assets";
import { PROJECTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type ProjectType = (typeof PROJECTS)[number];

type ProjectCardProps = ProjectType & {
  index: number;
  enableTilt: boolean;
  onOpenModal: () => void;
};

// Project Card Component
const ProjectCard = ({
  index,
  name,
  category,
  isLive,
  description,
  tags,
  image,
  source_code_link,
  live_site_link,
  enableTilt,
  onOpenModal,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenModal}
      className="relative bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col justify-between overflow-hidden border border-secondary/10 group-hover:border-[#915eff]/50 transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-2xl group-hover:shadow-[#915eff]/15"
    >
      {/* 1. Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(145, 94, 255, 0.22), transparent 75%)`,
        }}
      />

      <div>
        {/* Project Image & Visual Elements */}
        <div className="relative w-full h-48 sm:h-[220px] rounded-2xl overflow-hidden group">
          {/* 2. Smooth Image Zoom */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

          {/* 3. Live Indicator / Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            {isLive ? (
              <div className="flex items-center gap-1.5 bg-[#050816]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-[11px] font-semibold text-emerald-400 shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Live Demo</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-[#050816]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#915eff]/40 text-[11px] font-semibold text-[#dfd9ff] shadow-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#915eff]" />
                <span>Open Source</span>
              </div>
            )}
          </div>

          {/* 4. Action Buttons with Animated Tooltips */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            {/* Live Site Button */}
            {live_site_link && (
              <div className="relative group/btn">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(live_site_link, "_blank", "noreferrer");
                  }}
                  className="black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:scale-110 border border-transparent hover:border-emerald-400/60 transition duration-200"
                  role="button"
                  aria-label="Launch Live Site"
                >
                  <img src={preview} alt="Live Demo" className="w-5 h-5 object-contain" />
                </div>
                <span className="pointer-events-none absolute -bottom-7 right-0 whitespace-nowrap bg-black/95 text-white text-[10px] font-medium py-0.5 px-2 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 shadow-lg border border-white/10 z-20">
                  Live Site ↗
                </span>
              </div>
            )}

            {/* GitHub Repo Button */}
            {source_code_link && source_code_link.includes("github.com") && (
              <div className="relative group/btn">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(source_code_link, "_blank", "noreferrer");
                  }}
                  className="black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:scale-110 border border-transparent hover:border-[#915eff]/60 transition duration-200"
                  role="button"
                  aria-label="View Source Code"
                >
                  <img src={github} alt="GitHub" className="w-5 h-5 object-contain" />
                </div>
                <span className="pointer-events-none absolute -bottom-7 right-0 whitespace-nowrap bg-black/95 text-white text-[10px] font-medium py-0.5 px-2 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 shadow-lg border border-white/10 z-20">
                  GitHub Code ↗
                </span>
              </div>
            )}
          </div>

          {/* Hover Prompt: Quick Inspect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <span className="bg-[#915eff]/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Quick Inspect
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#915eff] text-xs font-semibold tracking-wide uppercase">
              {category}
            </span>
          </div>
          <h3 className="text-white font-bold text-[19px] sm:text-[21px] leading-snug group-hover:text-[#915eff] transition duration-200">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[13px] sm:text-[14px] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Tech Tags & Footer */}
      <div className="mt-4 pt-3 border-t border-secondary/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, tagIdx) => (
            <span
              key={`Tag-${tagIdx}`}
              className={cn(
                tag.color,
                "text-[12px] font-medium bg-black-200/60 px-2 py-0.5 rounded-md border border-white/5",
              )}
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <span className="text-secondary/70 group-hover:text-white text-xs font-semibold flex items-center gap-1 transition duration-200">
          Details →
        </span>
      </div>
    </div>
  );

  const cardClass =
    "project-card group w-full sm:w-[350px] lg:w-[380px] min-h-[460px] flex";

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.4, 0.75)} className="flex">
      {enableTilt ? (
        <Tilt
          options={{ max: 25, scale: 1.02, speed: 400, gyroscope: false }}
          className={cardClass}
        >
          {content}
        </Tilt>
      ) : (
        <div className={cardClass}>{content}</div>
      )}
    </motion.div>
  );
};

// Interactive Quick-View Modal
type ModalProps = {
  project: ProjectType | null;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ModalProps) => {
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

  if (!project) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-tertiary rounded-3xl p-6 sm:p-8 border border-[#915eff]/40 shadow-2xl shadow-[#915eff]/20 overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-[#915eff] text-white flex items-center justify-center transition duration-200 border border-white/10 z-20 min-h-0 min-w-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="bg-[#915eff]/20 text-[#915eff] border border-[#915eff]/40 text-xs px-3 py-1 rounded-full font-semibold">
            {project.category}
          </span>
          {project.isLive ? (
            <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-3 py-1 rounded-full font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Production Live
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-[#915eff]/20 text-[#dfd9ff] border border-[#915eff]/40 text-xs px-3 py-1 rounded-full font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#915eff]" />
              Open Source
            </span>
          )}
        </div>

        {/* Project Title */}
        <h2 className="text-white font-extrabold text-[22px] sm:text-[26px] leading-tight mb-4">
          {project.name}
        </h2>

        {/* High-res Image Preview */}
        <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-white/10 shadow-lg">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Full Description */}
        <p className="text-secondary text-[14px] sm:text-[15px] leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Key Architectural Highlights */}
        <div className="mb-6 bg-black-200/70 p-4 sm:p-5 rounded-2xl border border-white/5">
          <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
            <span className="text-[#915eff]">✦</span> Key Architectural Highlights
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, idx) => (
              <li
                key={`highlight-${idx}`}
                className="text-white-100 text-[13px] leading-relaxed flex items-start gap-2.5"
              >
                <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIdx) => (
            <span
              key={`modal-tag-${tagIdx}`}
              className={cn(
                tag.color,
                "text-xs font-semibold bg-black/40 px-3 py-1 rounded-lg border border-white/5",
              )}
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-secondary/15">
          <button
            onClick={onClose}
            className="border border-secondary/40 hover:border-white text-secondary hover:text-white text-xs font-semibold py-2.5 px-5 rounded-xl transition duration-200 min-h-0 min-w-0"
          >
            Close
          </button>

          {project.source_code_link && project.source_code_link.includes("github.com") && (
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-black hover:bg-neutral-900 border border-white/15 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow transition duration-200 inline-flex items-center gap-2 min-h-0 min-w-0"
            >
              <img src={github} alt="GitHub" className="w-4 h-4 object-contain" />
              <span>View GitHub Repo ↗</span>
            </a>
          )}

          {project.live_site_link && (
            <a
              href={project.live_site_link}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#915eff] hover:bg-[#7b46e3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-[#915eff]/30 transition duration-200 inline-flex items-center gap-2 min-h-0 min-w-0"
            >
              <span>Launch Live Site</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// Works (Main Section)
export const Works = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [enableTilt, setEnableTilt] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setEnableTilt(mediaQuery.matches);
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <SectionWrapper idName="projects">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        {/* Description */}
        <div className="w-full flex">
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-3 text-secondary text-[15px] sm:text-[17px] leading-7 w-full"
          >
            Following projects showcase my skills and experience through real-world examples.
            Each project is briefly described with links to code repositories and live demos.
            Click any card to inspect detailed architectural highlights and system design.
          </motion.p>
        </div>

        {/* Project Cards */}
        <div className="mt-14 flex flex-wrap gap-6 justify-center sm:justify-start">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={`project-${i}`}
              index={i}
              enableTilt={enableTilt}
              onOpenModal={() => setSelectedProject(project)}
              {...project}
            />
          ))}
        </div>

        {/* Quick-View Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </>
    </SectionWrapper>
  );
};

export default Works;
