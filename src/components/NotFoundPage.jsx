import { motion } from "framer-motion";
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
      {/* Inject custom CSS for extreme Neobrutalist subpixel text sharpness and font smoothing */}
      <style>{`
        .sharp-neobrutalist-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Decorations */}
      <ErrorDecorations />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 w-full relative z-10 flex flex-col justify-center sharp-neobrutalist-text">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-14 w-full">

          {/* LEFT SECTION */}
          <section className="relative z-10 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start sharp-neobrutalist-text">
            
            {/* OOPS Speech Bubble Badge - Sharp 90-degree corners */}
            <motion.div
              initial={{ opacity: 0, y: -80, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-block border-4 border-black bg-pink-400 px-6 py-2 shadow-[6px_6px_0px_black] relative rounded-none"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d"
              }}
            >
              <span className="font-mono font-black text-3xl text-black">
                OOPS!
              </span>
              {/* Speech bubble tail pointing downwards */}
              <div className="absolute -bottom-4 left-1/3 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
              <div className="absolute -bottom-[10px] left-1/3 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-pink-400" />
            </motion.div>

            {/* 404 Heading with WebkitTextStroke and paintOrder for crisp fonts */}
            <h1 className="leading-none font-black tracking-tight text-[100px] sm:text-[140px] md:text-[170px] lg:text-[200px] xl:text-[230px] select-none flex justify-center lg:justify-start">
              <motion.span 
                className="inline-block text-[#6E5CFE]" 
                style={{ 
                  WebkitTextStroke: "4px black", 
                  paintOrder: "stroke fill",
                  textShadow: "8px 8px 0px black",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d"
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
                  textShadow: "8px 8px 0px black",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d"
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
                  textShadow: "8px 8px 0px black",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d"
                }}
                animate={{ rotate: [-4, -2, -4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                4
              </motion.span>
            </h1>

            {/* Page Not Found Banner - Sharp 90-degree corners */}
            <div 
              className="mt-4 inline-block border-4 border-black bg-[#6E5CFE] px-8 py-4 shadow-[8px_8px_0px_black] rounded-none"
              style={{
                transform: "rotate(-2deg)",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d"
              }}
            >
              <h2 className="font-mono font-black text-2xl sm:text-3xl md:text-4xl uppercase text-black">
                Page Not Found
              </h2>
            </div>

            {/* Description Box - Sharp 90-degree corners */}
            <div 
              className="mt-10 max-w-lg border-4 border-black bg-white p-7 shadow-[8px_8px_0px_black] text-left rounded-none"
              style={{
                transform: "rotate(-1deg)",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d"
              }}
            >
              <p className="text-xl sm:text-2xl font-bold leading-relaxed text-black">
                Looks like you've wandered into the{" "}
                <span className="bg-[#D2F801] px-2 py-0.5 font-black">
                  void.
                </span>
                <br />
                Let's get you back!
              </p>
            </div>

            {/* Take me Home Button - Sharp 90-degree corners */}
            <button
              onClick={handleGoHome}
              onMouseEnter={() => audioSynth.playHover()}
              className="mt-10 inline-flex items-center gap-3 px-6 sm:px-8 py-4 border-4 border-black bg-[#D2F801] shadow-[8px_8px_0_black] text-base sm:text-xl font-black transition duration-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-none cursor-pointer text-black rounded-none"
              style={{
                transform: "rotate(-1deg)",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d"
              }}
            >
              TAKE ME HOME
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 448 512" 
                height="24" 
                width="24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
              </svg>
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
