import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Publications,
  StarsCanvas,
  ScrollProgress,
  BackToTop,
  CustomCursor,
  Skills,
  Certifications,
} from "./components";
import Banner from "./components/banner";
import Footer from "./components/footer";

// App
const App = () => {
  const [hide, setHide] = useState(true);

  return (
    <BrowserRouter>
      {/* 1. Global Glowing Scroll Progress Bar */}
      <ScrollProgress />

      {/* 2. Interactive Smooth Cursor Follower (Desktop Only) */}
      <CustomCursor />

      {/* 3. Global Banner Notification */}
      <Banner hide={hide} setHide={setHide} />

      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar hide={hide} />
          <Hero />
        </div>
        <About />
        <Skills />
        <Experience />
        <Tech />
        <Works />
        <Certifications />
        <Publications />
        <Feedbacks />

        {/* Contact */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </div>

      {/* 4. Floating Back to Top Button with Circular Progress Ring */}
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
