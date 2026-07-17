import { motion } from "framer-motion";

export default function ErrorDecorations() {
  return (
    <div className="hidden md:block">
      
      {/* LEFT Spark (Radiating lines above OOPS) */}
      <motion.div
        className="absolute left-32 top-52 z-10"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <span className="absolute h-8 w-1 bg-black rounded-none transform -rotate-[35deg] origin-bottom -translate-x-3 -translate-y-1" />
          <span className="absolute h-9 w-1 bg-black rounded-none transform rotate-[0deg] origin-bottom -translate-y-3" />
          <span className="absolute h-8 w-1 bg-black rounded-none transform rotate-[35deg] origin-bottom translate-x-3 -translate-y-1" />
        </div>
      </motion.div>

      {/* Center Spark (Radiating lines above 404) */}
      <motion.div
        className="absolute left-[36%] top-24 z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <span className="absolute h-8 w-1 bg-black rounded-none transform -rotate-[35deg] origin-bottom -translate-x-3 -translate-y-1" />
          <span className="absolute h-9 w-1 bg-black rounded-none transform rotate-[0deg] origin-bottom -translate-y-3" />
          <span className="absolute h-8 w-1 bg-black rounded-none transform rotate-[35deg] origin-bottom translate-x-3 -translate-y-1" />
        </div>
      </motion.div>

      {/* Bottom Left Zigzag */}
      <motion.div
        className="absolute bottom-32 left-12 z-10"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <svg width="110" height="22">
          <polyline
            points="0,16 15,4 30,16 45,4 60,16 75,4 90,16 105,4"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </motion.div>

      {/* Right Zigzag */}
      <motion.div
        className="absolute right-12 top-72 z-10"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <svg width="90" height="22">
          <polyline
            points="0,16 15,4 30,16 45,4 60,16 75,4 90,16"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </motion.div>

      {/* Pink Square (Left Side) - Sharp 90-degree corners */}
      <motion.div
        className="absolute left-12 top-[58%] z-10"
        animate={{
          rotate: [-15, 15, -15],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
      >
        <div className="h-14 w-14 border-4 border-black bg-pink-400 shadow-[6px_6px_0px_black] rounded-none" />
      </motion.div>

      {/* Purple Square (Top Right) - Sharp 90-degree corners */}
      <motion.div
        className="absolute right-12 top-48 z-10"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <div className="h-6 w-6 border-4 border-black bg-[#6E5CFE] rounded-none transform rotate-12" />
      </motion.div>

      {/* Dots (Right Side) */}
      <div className="absolute right-8 top-[45%] grid grid-cols-5 gap-3 z-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-none bg-black"
          />
        ))}
      </div>

      {/* Bottom Left Stripes Block - Sharp 90-degree corners */}
      <div className="absolute bottom-10 left-10 h-24 w-24 border-4 border-black bg-white shadow-[6px_6px_0_black] z-10 rounded-none overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#000_0px,#000_6px,transparent_6px,transparent_14px)]" />
      </div>

      {/* Floating X (Right Side) */}
      <motion.div
        className="absolute right-16 top-[44%] text-4xl font-black z-10 select-none pointer-events-none"
        animate={{
          rotate: [0, 180, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
      >
        ×
      </motion.div>

      {/* Purple staircase at the bottom right corner */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-36 h-36 md:w-52 md:h-52 drop-shadow-[6px_6px_0px_black]">
          <path 
            d="M 0,100 L 0,75 L 25,75 L 25,50 L 50,50 L 50,25 L 75,25 L 75,0 L 100,0 L 100,100 Z" 
            fill="#6E5CFE" 
            stroke="black" 
            strokeWidth="5" 
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </div>
  );
}
