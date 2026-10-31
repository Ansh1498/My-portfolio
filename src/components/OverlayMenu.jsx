
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowUpRight } from "react-icons/fi";

const menuItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 1024;

  const origin = isMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-5"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "#C5C8B8" }}
        >
          {/* Menu Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative w-full max-w-md bg-[#D5D8C9] border border-[#263D29]/20 rounded-2xl shadow-[0_20px_60px_rgba(38,61,41,0.15)] px-7 py-8 md:px-10 md:py-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-xs tracking-[0.25em] text-[#52604D]">
                  NAVIGATION
                </p>
                <h2 className="text-2xl font-semibold text-[#111811] mt-1">
                  Explore
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full border border-[#263D29]/20 flex items-center justify-center text-[#263D29] hover:bg-[#263D29] hover:text-white transition-colors duration-300"
              >
                <FiX size={21} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.07 }}
                  className="group flex items-center justify-between rounded-lg px-4 py-3 text-[#111811] hover:bg-[#579D38]/15 hover:text-[#263D29] transition-all duration-300"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs text-[#579D38]">
                      0{index + 1}
                    </span>
                    <span className="text-lg font-medium">{item}</span>
                  </span>

                  <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="border-t border-[#263D29]/15 mt-6 pt-5">
              <p className="text-xs text-[#52604D] text-center tracking-wider">
                © {new Date().getFullYear()} ANSH MAHOVIYA
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
