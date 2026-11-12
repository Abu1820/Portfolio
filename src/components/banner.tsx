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
        hide ? "hidden" : "block"
      } absolute h-20 top-0 left-0 z-50 flex justify-between w-full p-4 bg-primary shadow-md opacity-[0.98]`}
    >
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-gray-500 ">
          <span className="inline-flex p-1 mr-3 bg-gray-200 rounded-full ">
            <img
              src={bulb}
              alt="bulb"
              height={12}
              width={12}
              className="text-gray-500"
            />
            <span className="sr-only">Light bulb</span>
          </span>
          <span>
            🌱 Project <strong>Uniora</strong> was awarded official KPRIET Seed Funding! Explore the{" "}
            <Link
              to="https://uni-ora.uniora-official.workers.dev/dashboard/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline font-medium text-blue-400 underline-offset-2 decoration-600 hover:text-blue-300 transition"
            >
              live platform
            </Link>{" "}
            or check out my co-authored book on{" "}
            <Link
              to="https://amzn.in/d/j7muHtb"
              target="_blank"
              rel="noreferrer noopener"
              className="inline font-medium text-orange-400 underline-offset-2 decoration-600 hover:text-orange-300 transition"
            >
              Amazon Kindle
            </Link>
            .
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <button
          data-dismiss-target="#sticky-banner"
          onClick={handleBannerClose}
          type="button"
          className="shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-800 rounded-lg text-sm p-1.5 "
        >
          <img src={close} alt="close" height={12} width={12} />
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
