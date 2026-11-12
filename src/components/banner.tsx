import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { close, bulb } from "../assets";

type BannerProps = {
  hide: boolean;
  setHide: (hide: boolean) => void;
};

const BANNER_KEY = "hide-banner";

const Banner = ({ hide, setHide }: BannerProps) => {
  useEffect(() => {
    const hideBanner = localStorage.getItem(BANNER_KEY);

    if (hideBanner) return;

    const bannerTimer = setTimeout(() => {
      setHide(false);
    }, 5000);

    return () => clearTimeout(bannerTimer);
  }, []);

  const handleBannerClose = () => {
    setHide(true);
    localStorage.setItem(BANNER_KEY, "1");
  };

  return (
    <div
      id="sticky-banner"
      tabIndex={-1}
      className={`${
        hide ? "hidden" : "flex"
      } fixed top-0 left-0 right-0 z-30 min-h-[44px] items-center justify-between px-4 py-2 bg-[#151030]/95 backdrop-blur-md border-b border-[#915eff]/30 shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center mx-auto text-xs sm:text-sm text-[#dfd9ff]">
        <span className="inline-flex items-center justify-center p-1 mr-2.5 bg-[#915eff]/20 rounded-full shrink-0">
          <img
            src={bulb}
            alt="bulb"
            height={14}
            width={14}
            className="brightness-125"
          />
        </span>
        <span className="leading-snug">
          🌱 Project <strong className="text-white font-semibold">Uniora</strong> received official KPRIET Seed Funding! Explore the{" "}
          <Link
            to="https://uni-ora.uniora-official.workers.dev/dashboard/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition"
          >
            live platform
          </Link>{" "}
          or view my co-authored book on{" "}
          <Link
            to="https://amzn.in/d/j7muHtb"
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 transition"
          >
            Amazon Kindle
          </Link>
          .
        </span>
      </div>
      <button
        onClick={handleBannerClose}
        type="button"
        aria-label="Close banner"
        className="shrink-0 ml-2 inline-flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition"
      >
        <img src={close} alt="close" height={14} width={14} className="opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
};

export default Banner;
