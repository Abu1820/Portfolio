import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import {
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  type ContactFormFields,
} from "../lib/contact";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";

const FIELD_VALIDATORS: Record<
  keyof ContactFormFields,
  (value: string) => boolean
> = {
  name: isValidContactName,
  email: isValidContactEmail,
  message: isValidContactMessage,
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const hasAttemptedSubmit = useRef(false);
  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    el.style.overflowY = "hidden";
    el.style.height = "auto";

    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);

    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }

    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormFields;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (!hasAttemptedSubmit.current) return;

    const isInvalid = !FIELD_VALIDATORS[field](value);
    setFieldErrors((prev) =>
      prev[field] === isInvalid ? prev : { ...prev, [field]: isInvalid },
    );
  };

  const validateForm = () => {
    hasAttemptedSubmit.current = true;

    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      message: !isValidContactMessage(form.message),
    };

    setFieldErrors(nextErrors);

    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Compose mailto to ensure delivery to Abdul Majeed directly
      const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Hi Abdul Majeed,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n`
      );
      window.location.href = `mailto:abdulmajeed564600@gmail.com?subject=${subject}&body=${body}`;

      toast.success("Opening your email client to send message to abdulmajeed564600@gmail.com!");
      setForm({
        name: "",
        email: "",
        message: "",
      });
      setFieldErrors({
        name: false,
        email: false,
        message: false,
      });
    } catch (error) {
      console.error("[CONTACT_ERROR]: ", error);
      toast.error("Something went wrong. Please email directly at abdulmajeed564600@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col gap-8"
    >
      <label htmlFor="name" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Name*</span>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium text-sm"
        />
        {fieldErrors.name && (
          <span className="text-red-400 text-xs mt-1">Please enter a valid name.</span>
        )}
      </label>

      <label htmlFor="email" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Email*</span>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="What's your email?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium text-sm"
        />
        {fieldErrors.email && (
          <span className="text-red-400 text-xs mt-1">Please enter a valid email address.</span>
        )}
      </label>

      <label htmlFor="message" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Message*</span>
        <textarea
          id="message"
          rows={5}
          ref={messageRef}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What would you like to say?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium text-sm resize-none"
        />
        {fieldErrors.message && (
          <span className="text-red-400 text-xs mt-1">Please enter a message (at least 10 characters).</span>
        )}
      </label>

      <button
        type="submit"
        title={loading ? "Sending..." : "Send Message"}
        className="bg-tertiary hover:bg-[#915eff] transition duration-200 py-3 px-8 outline-hidden w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export const Contact = () => {
  return (
    <SectionWrapper idName="contact">
      <div className="xl:mt-12 flex flex-col xl:flex-row gap-8 xl:gap-10 overflow-hidden">
        {/* Contact Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="w-full xl:flex-[0.75] bg-black-100 p-6 sm:p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h2 className={styles.sectionHeadText}>Contact.</h2>
          <ContactForm />
        </motion.div>

        {/* Earth Canvas */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto h-64 sm:h-96"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
export default Contact;
