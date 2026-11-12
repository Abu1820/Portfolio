import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { logo, menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

type NavbarProps = {
  hide: boolean;
};

// Navbar
export const Navbar = ({ hide }: NavbarProps) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setToggle(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!toggle) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setToggle(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);

  const handleNavClick = useCallback((title: string) => {
    setActive(title);
    setToggle(false);
  }, []);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300",
        scrolled || hide
          ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20 mt-0"
          : "bg-transparent mt-0",
      )}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group min-h-0 min-w-0"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
          aria-label="Abdul Majeed R – Home"
        >
          <img
            src={logo}
            alt="A"
            className="w-9 h-9 object-contain group-hover:scale-110 transition duration-200"
          />
          <p className="text-white text-[17px] font-bold cursor-pointer leading-tight">
            Abdul Majeed R
            <span className="sm:inline hidden text-secondary font-normal">
              &nbsp;| Developer
            </span>
          </p>
        </Link>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden sm:flex flex-row gap-1">
          {NAV_LINKS.map((link) => (
            <li
              key={link.id}
              className={cn(
                "text-[15px] font-medium cursor-pointer rounded-full px-3 py-2 transition duration-200 min-h-0 min-w-0",
                active === link.title
                  ? "text-white bg-[#915eff]/15"
                  : "text-secondary hover:text-white hover:bg-white/5",
              )}
              onClick={() => !link.link && handleNavClick(link.title)}
            >
              {link.link ? (
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="min-h-0 min-w-0"
                >
                  {link.title}
                </a>
              ) : (
                <a href={`#${link.id}`} className="min-h-0 min-w-0">
                  {link.title}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition min-h-0 min-w-0"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt={toggle ? "Close" : "Menu"}
              className="w-6 h-6 object-contain"
            />
          </button>

          {/* Mobile Dropdown */}
          <div
            className={cn(
              toggle ? "flex" : "hidden",
              "p-5 black-gradient absolute top-16 right-4 mx-0 my-0 min-w-48 z-30 rounded-2xl shadow-2xl border border-white/5",
            )}
          >
            <ul className="list-none flex flex-col gap-1 w-full">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.id}
                  className={cn(
                    "font-medium cursor-pointer text-[15px] rounded-xl px-4 py-3 transition duration-150 min-h-0 min-w-0 w-full",
                    active === link.title
                      ? "text-white bg-[#915eff]/20"
                      : "text-secondary hover:text-white hover:bg-white/5",
                  )}
                  onClick={() => !link.link && handleNavClick(link.title)}
                >
                  {link.link ? (
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block w-full min-h-0 min-w-0"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a href={`#${link.id}`} className="block w-full min-h-0 min-w-0">
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
