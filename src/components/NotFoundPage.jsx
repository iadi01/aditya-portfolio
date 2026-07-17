import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { navigateTo } from "../utils/router";
import { audioSynth } from "../utils/audioSynth";
import useMouseParallax from "../hooks/useMouseParallax";

import ErrorRobot from "./ErrorRobot";
import ErrorShapes from "./ErrorShapes";
import ErrorDecorations from "./ErrorDecorations";

export default function NotFoundPage() {
  useMouseParallax();

  const handleGoHome = (e) => {
    e.preventDefault();
    audioSynth.playClick();
    navigateTo("/");
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-hidden bg-[#FDFBF7] text-black font-sans flex flex-col justify-center"
    >
      {/* Decorations */}
      <ErrorDecorations />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 xl:gap-24">

          {/* LEFT SECTION */}
          <section className="relative z-10 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* OOPS Badge */}
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-block rounded-xl border-4 border-black bg-pink-400 px-6 py-2 shadow-[6px_6px_0px_black] transform -rotate-[3deg]"
            >
              <span className="font-mono font-black text-3xl">
                OOPS!
              </span>
            </motion.div>

            {/* 404 Heading */}
            <h1 className="leading-none font-black tracking-tight text-[110px] sm:text-[150px] md:text-[180px] lg:text-[210px] xl:text-[240px] select-none flex justify-center lg:justify-start">
              <motion.span 
                className="inline-block text-[#6E5CFE]" 
                style={{ WebkitTextStroke: "4px black", textShadow: "8px 8px 0px black" }}
                animate={{ rotate: [-6, -4, -6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                4
              </motion.span>
              <motion.span 
                className="inline-block -ml-4 sm:-ml-6 text-[#D2F801]" 
                style={{ WebkitTextStroke: "4px black", textShadow: "8px 8px 0px black" }}
                animate={{ rotate: [4, 6, 4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                0
              </motion.span>
              <motion.span 
                className="inline-block -ml-4 sm:-ml-6 text-[#FF72B6]" 
                style={{ WebkitTextStroke: "4px black", textShadow: "8px 8px 0px black" }}
                animate={{ rotate: [-4, -2, -4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                4
              </motion.span>
            </h1>

            {/* Page Not Found Banner */}
            <div className="mt-5 inline-block rounded-xl border-4 border-black bg-[#6E5CFE] px-8 py-4 shadow-[8px_8px_0px_black] transform -rotate-[2deg]">
              <h2 className="font-mono font-black text-3xl sm:text-4xl md:text-5xl uppercase text-black">
                Page Not Found
              </h2>
            </div>

            {/* Description Box */}
            <div className="mt-10 max-w-xl rounded-2xl border-4 border-black bg-white p-7 shadow-[8px_8px_0px_black] text-left transform -rotate-[1deg]">
              <p className="text-xl sm:text-2xl font-bold leading-relaxed">
                Looks like you've wandered into the{" "}
                <span className="bg-[#D2F801] px-2 py-0.5 font-black">
                  void.
                </span>
                <br />
                Let's get you back!
              </p>
            </div>

            {/* Take me Home Button */}
            <button
              onClick={handleGoHome}
              onMouseEnter={() => audioSynth.playHover()}
              className="mt-10 inline-flex items-center gap-3 px-7 sm:px-10 py-5 rounded-xl border-4 border-black bg-[#D2F801] shadow-[8px_8px_0_black] text-lg sm:text-2xl font-black transition duration-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-none cursor-pointer text-black transform -rotate-[1deg]"
            >
              TAKE ME HOME
              <FaArrowRight size={28} />
            </button>

          </section>

          {/* RIGHT SECTION */}
          <section className="order-1 lg:order-2 flex justify-center relative items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            {/* Parallax Layer 1: Shapes Background */}
            <div data-parallax=".4" className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              <ErrorShapes />
            </div>

            {/* Parallax Layer 2: Robot Mascot Foreground */}
            <div data-parallax=".8" className="relative z-20 flex justify-center pointer-events-none">
              <ErrorRobot />
            </div>
          </section>

        </div>
      </div>
    </motion.main>
  );
}
