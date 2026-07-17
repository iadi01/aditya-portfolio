import { motion } from "framer-motion";

export default function ErrorDecorations() {
  return (
    <div className="hidden md:block">
      {/* LEFT Spark */}
      <motion.div
        className="absolute left-10 top-72 z-10"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <div className="flex gap-4">
          <span className="h-14 w-1 rounded bg-black rotate-[-40deg]" />
          <span className="h-16 w-1 rounded bg-black rotate-[-8deg]" />
        </div>
      </motion.div>

      {/* Center Spark */}
      <motion.div
        className="absolute left-[46%] top-52"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex gap-3">
          <span className="h-10 w-1 bg-black rotate-[-35deg]" />
          <span className="h-12 w-1 bg-black" />
          <span className="h-10 w-1 bg-black rotate-[35deg]" />
        </div>
      </motion.div>

      {/* Bottom Left Zigzag */}
      <motion.div
        className="absolute bottom-32 left-12"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <svg width="110" height="22">
          <polyline
            points="0,16 15,4 30,16 45,4 60,16 75,4 90,16 105,4"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Right Zigzag */}
      <motion.div
        className="absolute right-10 top-72"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <svg width="90" height="22">
          <polyline
            points="0,16 15,4 30,16 45,4 60,16 75,4 90,16"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Pink Square */}
      <motion.div
        className="absolute left-12 top-[58%]"
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
      >
        <div className="h-14 w-14 border-4 border-black bg-custom-pink shadow-[6px_6px_0px_black]" />
      </motion.div>

      {/* Purple Square */}
      <motion.div
        className="absolute right-10 top-48"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
      >
        <div className="h-6 w-6 border-4 border-black bg-custom-purple" />
      </motion.div>

      {/* Dots */}
      <div className="absolute right-8 top-[45%] grid grid-cols-5 gap-3">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-black"
          />
        ))}
      </div>

      {/* Bottom Left Stripes */}
      <div className="absolute bottom-10 left-10 h-24 w-24 border-4 border-black bg-white shadow-[6px_6px_0_black]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#000_0px,#000_6px,transparent_6px,transparent_14px)]" />
      </div>

      {/* Floating X */}
      <motion.div
        className="absolute right-16 top-[44%] text-4xl font-black"
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
    </div>
  );
}
