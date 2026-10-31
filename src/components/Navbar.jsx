
import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./OverlayMenu";
import { FiMenu } from "react-icons/fi";
import Logo2 from "../assets/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center ">
          <img
            src={Logo2}
            alt="Logo"
            className="w-8 h-8"
            style={{ filter: "brightness(0) saturate(100%)" }}
          />
          <div className="text-2xl font-bold text-[#1e291f] hidden sm:block">
            nsh
          </div>
        </div>

        {/* Menu Button */}
        <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[#172018] text-3xl focus:outline-none"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* Contact Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-[#2a362b] text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-black/10 hover:bg-[#5c8829] hover:text-[#222127] hover:scale-105 transition-all duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
