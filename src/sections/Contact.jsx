// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing motion component from Framer Motion for animations
import { motion } from "framer-motion";

// Importing EmailJS SDK
import emailjs from "@emailjs/browser";

// Importing the contact image asset
import Astra from "../assets/Astra.png";

// Reading EmailJS credentials from environment variables (Vite)
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field"),
    );

    if (formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill this field";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );

      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative z-10 bg-[#C5C8B8] overflow-hidden text-[#111811] py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      {/* Contact Section Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex w-full md:w-1/2 justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Side Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-[#D5D8C9]/80 p-8 rounded-2xl shadow-[0_15px_40px_rgba(38,61,41,0.12)] border border-[#263D29]/20"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#111811]">
            Let’s Work Together
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="flex flex-col">
              <label className="mb-1 text-[#263D29] font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-[#C5C8B8]/70 border ${
                  errors.name ? "border-red-500" : "border-[#263D29]/30"
                } text-[#111811] placeholder:text-[#52604D] focus:outline-none focus:border-[#579D38]`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            {/* Email field */}
<div className="flex flex-col mb-1 text-[#263D29] font-medium">
  <label className="mb-1">
    Email <span className="text-red-500">*</span>
  </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-[#C5C8B8]/70 border ${
                  errors.email ? "border-red-500" : "border-[#263D29]/30"
                } text-[#111811] placeholder:text-[#52604D] focus:outline-none focus:border-[#579D38]`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Service dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 text-[#263D29] font-medium">
                Service Needed <span className="text-red-500">*</span>
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-[#C5C8B8]/70 border ${
                  errors.service ? "border-red-500" : "border-[#263D29]/30"
                } text-[#111811] placeholder:text-[#52604D] focus:outline-none focus:border-[#579D38]`}
              >
                <option value="" disabled className="text-[#52604D]">
                  Something in mind?
                </option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="Mobile Application" className="text-black">
                  Mobile Application
                </option>
                <option value="Others" className="text-black">
                  Others
                </option>
              </select>

              {errors.service && (
                <p className="text-red-500 text-xs">{errors.service}</p>
              )}
            </div>

            {/* Budget field */}
            {formData.service && formData.service !== "other" && (
              <div className="flex flex-col">
                <label className="mb-1 text-[#263D29] font-medium">
                  Budget <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="budget"
                  placeholder="Your Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-[#C5C8B8]/70 border ${
                    errors.budget ? "border-red-500" : "border-[#263D29]/30"
                  } text-[#111811] placeholder:text-[#52604D] focus:outline-none focus:border-[#579D38]`}
                />

                {errors.budget && (
                  <p className="text-red-500 text-xs">{errors.budget}</p>
                )}
              </div>
            )}

            {/* Idea textarea */}
            <div className="flex flex-col">
              <label className="mb-1 text-[#263D29] font-medium">
                Idea <span className="text-red-500">*</span>
              </label>

              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-[#C5C8B8]/70 border ${
                  errors.idea ? "border-red-500" : "border-[#263D29]/30"
                } text-[#111811] placeholder:text-[#52604D] focus:outline-none focus:border-[#579D38]`}
              />

              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {/* Status message */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-[#263D29]"
                    : status === "error"
                      ? "text-red-600"
                      : "text-[#8A641B]"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message sent successfully ✅"
                    : "Something went wrong ❌"}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="
  bg-gradient-to-r from-[#8FCB35] via-[#78B82B] to-[#579D38]
  hover:brightness-105
  disabled:opacity-60
  text-[#111811]
  py-3
  rounded-md
  font-semibold
  transition
"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
