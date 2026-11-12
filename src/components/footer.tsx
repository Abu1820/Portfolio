import { Link } from "react-router-dom";

import { SOCIALS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Footer
const Footer = () => {
  return (
    <footer
      className={cn(
        styles.paddingX,
        "w-full py-6 sm:py-8 bg-primary border-t border-t-secondary/10",
      )}
    >
      <div className="footer-inner w-full flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        {/* Copyright */}
        <p className="text-secondary text-sm font-medium text-center sm:text-left">
          © Abdul Majeed R {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Social Icons */}
        <ul className="list-none flex flex-row gap-5 sm:gap-8 items-center">
          {SOCIALS.map((social) => (
            <li
              key={social.name}
              className="opacity-70 hover:opacity-100 transition duration-200"
              title={social.name}
            >
              <Link
                to={social.link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.name}
                className="min-h-0 min-w-0"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="h-6 w-6 object-contain"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
