import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import circle1 from "../assets/green_shape_clean.png";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FaYoutube, FaInstagram } from "react-icons/fa6";
// import ParticleBackground from "../components/ParticlesBackground";

const socials = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in",
  },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Ansh1498" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(163,230,53,0.9)) drop-shadow(0 0 18px rgba(132,204,22,0.7))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(() => ["Software Developer", "Web Developer"], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typing effect logic — unchanged
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen w-full relative overflow-hidden bg-[#C5C8B8]"
    >
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left relative"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            {/* Typing text */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#26351F] tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-[#a3e635] animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text 
  bg-[#405C25] drop-shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-[#111811] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Ansh Mahoviya
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-[#303A2D] max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences —
              building modern, scalable, and lightning-fast applications that
              make a difference.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-[#111811]
  bg-gradient-to-r from-[#8FCB35] via-[#78B82B] to-[#579D38]
  shadow-lg shadow-green-900/15
  hover:scale-105 transition-all duration-300"
              >
                View My Work
              </a>
              <a
                href="#skills"
                className="px-6 py-3 rounded-full text-lg font-medium text-white
bg-gradient-to-r from-[#263D29] via-[#192A1D] to-[#111811]
border border-[#8FCB35]
hover:from-[#8FCB35] hover:via-[#78B82B] hover:to-[#579D38]
hover:text-[#111811]
shadow-lg shadow-black/10
hover:scale-105 transition-all duration-300"
              >
                My Skills
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-[#26351F]"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right — same image dimensions and positioning */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <motion.img
            src={circle1}
            alt="My avatar"
            className="absolute top-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(35vw, 780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: "-50%", scale: 0.95, x: 0, rotate: 0 }}
            animate={{
              opacity: 1,
              // scale: chhota-bada hota rahega
              scale: [1, 1.08, 0.95, 1],
              // x: right se left aur left se right
              x: [0, 40, -40, 0],
              // y: neeche se upar aur upar se neeche (center ke around)
              y: ["-50%", "-54%", "-46%", "-50%"],
              // rotate: thoda tilt hota rahega
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              opacity: { delay: 1, duration: 1 },
              scale: {
                delay: 1,
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                delay: 1,
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: { delay: 1, duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: {
                delay: 1,
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
