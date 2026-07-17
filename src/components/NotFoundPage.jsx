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
      className="relative w-screen h-screen max-h-screen overflow-hidden bg-[#FDFBF7] text-black font-sans flex flex-col justify-center items-center antialiased select-none"
    >
      {/* Decorations */}
      <ErrorDecorations />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 w-full relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-14 w-full">

          {/* LEFT SECTION */}
          <section className="relative z-10 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* OOPS Speech Bubble Badge */}
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-block rounded-2xl border-4 border-black bg-pink-400 px-6 py-2 shadow-[6px_6px_0px_black] transform -rotate-[3deg] relative"
            >
              <span className="font-mono font-black text-3xl text-black">
                OOPS!
              </span>
              {/* Speech bubble tail pointing downwards */}
              <div className="absolute -bottom-4 left-1/3 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
              <div className="absolute -bottom-[10px] left-1/3 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-pink-400" />
            </motion.div>

            {/* 404 Heading with Paint-Order Outline Alignment for maximum sharpness */}
            <h1 className="leading-none font-black tracking-tight text-[100px] sm:text-[140px] md:text-[170px] lg:text-[200px] xl:text-[230px] select-none flex justify-center lg:justify-start">
              <motion.span 
                className="inline-block text-[#6E5CFE]" 
                style={{ 
                  WebkitTextStroke: "4px black", 
                  paintOrder: "stroke fill",
                  textShadow: "8px 8px 0px black" 
                }}
                animate={{ rotate: [-6, -4, -6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                4
              </motion.span>
              <motion.span 
                className="inline-block -ml-4 sm:-ml-6 text-[#D2F801]" 
                style={{ 
                  WebkitTextStroke: "4px black", 
                  paintOrder: "stroke fill",
                  textShadow: "8px 8px 0px black" 
                }}
                animate={{ rotate: [4, 6, 4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                0
              </motion.span>
              <motion.span 
                className="inline-block -ml-4 sm:-ml-6 text-[#FF72B6]" 
                style={{ 
                  WebkitTextStroke: "4px black", 
                  paintOrder: "stroke fill",
                  textShadow: "8px 8px 0px black" 
                }}
                animate={{ rotate: [-4, -2, -4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                4
              </motion.span>
            </h1>

            {/* Page Not Found Banner */}
            <div className="mt-4 inline-block rounded-xl border-4 border-black bg-[#6E5CFE] px-8 py-4 shadow-[8px_8px_0px_black] transform -rotate-[2deg]">
              <h2 className="font-mono font-black text-2xl sm:text-3xl md:text-4xl uppercase text-black">
                Page Not Found
              </h2>
            </div>

            {/* Description Box */}
            <div className="mt-8 max-w-lg rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_black] text-left transform -rotate-[1deg]">
              <p className="text-lg sm:text-xl font-bold leading-relaxed text-black">
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
              className="mt-8 inline-flex items-center gap-3 px-6 sm:px-8 py-4 rounded-xl border-4 border-black bg-[#D2F801] shadow-[8px_8px_0_black] text-base sm:text-xl font-black transition duration-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-none cursor-pointer text-black transform -rotate-[1deg]"
            >
              TAKE ME HOME
              <FaArrowRight size={24} />
            </button>

          </section>

          {/* RIGHT SECTION */}
          <section className="order-1 lg:order-2 flex justify-center relative items-center min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
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
