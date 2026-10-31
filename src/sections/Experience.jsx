// Importing React for building UI components
import React from "react";
// Importing motion components and scroll hooks from Framer Motion for animations
import { motion, useScroll, useTransform } from "framer-motion";

// Array of experience objects containing job details

const experiences = [
  {
    role: "Frontend Developer",
    company: "Frontend Projects",
    duration: "2026 - Present",
    description:
      "Built modern, responsive web interfaces using React.js and Tailwind CSS, with smooth animations using Framer Motion and GSAP, focusing on clean UI design and engaging user experiences.",
  },
  {
    role: "AI Engineer",
    company: "AI Projects",
    duration: "2026 - Present",
    description:
      "Developed AI-powered applications using Agentic AI, LangGraph, and MCP servers, while exploring machine learning models and building intelligent workflows for real-world use cases.",
  },
  {
    role: "Full Stack Developer",
    company: "Personal Projects",
    duration: "2026 - Present",
    description:
      "Built full-stack applications by integrating frontend interfaces with Python FastAPI backends, REST APIs, and databases to create functional, data-driven web applications.",
  },
];

// Reusable component to render each experience item with animations
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  // Animates the size of the marker (dot) as user scrolls
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the marker
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the card
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Checks if card should be displayed above or below the timeline line
  const isAbove = idx % 2 === 0;
  // Animates vertical movement of cards for desktop layout
  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0],
  );
  // Animates horizontal movement of cards for mobile layout
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // Render for Desktop layout
  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${exp.role}-${idx}`}
      >
        {/* Marker dot on the timeline */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-[#579D38] border-4 border-[#C5C8B8] shadow-[0_0_0_8px_rgba(87,157,56,0.15)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        {/* Small vertical line above or below the marker */}
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-[#579D38]/50`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        {/* Experience card with role, company, duration, description */}
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-[#D5D8C9]/90 backdrop-blur border border-[#263D29]/20 rounded-xl p-7 w-[320px] shadow-[0_12px_35px_rgba(38,61,41,0.12)]`}
        >
          <h3 className="text-xl font-semibold text-[#111811]">{exp.role}</h3>
          <p className="text-md text-[#52604D] mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-[#303A2D] break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  // Render for Mobile layout
  return (
    <div
      key={`${exp.company}-${exp.role}-m-${idx}`}
      className="relative flex items-start"
    >
      {/* Marker dot on mobile timeline */}
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-[#579D38] border-4 border-[#C5C8B8] shadow-[0_0_0_8px_rgba(87,157,56,0.15)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* Experience card (mobile version) */}
      <motion.article
        className="bg-[#D5D8C9]/90 backdrop-blur border border-[#263D29]/20 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-[0_12px_35px_rgba(38,61,41,0.12)]"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold text-[#111811] break-words">
          {exp.role}
        </h3>
        <p className="text-sm text-[#52604D] mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-[#303A2D] break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

// Main Experience component
const Experience = () => {
  const sceneRef = React.useRef(null); // Ref for the scrolling section
  const [isMobile, setIsMobile] = React.useState(false); // State to track if device is mobile

  // Detect window size and set isMobile state
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic scene height based on device type and number of experiences
const SCENE_HEIGHT_VH = isMobile
  ? 100 * experiences.length * 1.7
  : 100 * experiences.length * 1.2;
  
  // Get scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  // Calculate thresholds for each experience card's animation start/end
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: numExperiences },
        (_, i) => (i + 1) / numExperiences,
      ),
    [numExperiences],
  );

  // Animate timeline line width (desktop) and height (mobile)
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section
  id="experience"
  className="relative z-0 overflow-clip bg-[#C5C8B8] text-[#111811] md:pb-16"
>
      {/* Main container with dynamic height */}
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 min-h-screen h-auto md:h-screen flex flex-col">
          {/* Section Title */}
          <div className="shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center text-[#111811]">
  Experience
</h2>
          </div>
          {/* Timeline container */}
          <div className="flex-1 flex items-center justify-center px-6">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Horizontal timeline line */}
              <div className="relative h-[6px] bg-[#263D29]/20 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-[#579D38] rounded origin-left"
                  style={{ width: lineWidth }}
                />
              </div>
              {/* Experience items mapped for desktop */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#263D29]/20 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-[#579D38] rounded origin-top"
                  style={{ height: lineHeight }}
                />
              </div>
              {/* Experience items mapped for mobile */}
              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-8">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; // Exporting Experience component
