import { motion } from "framer-motion";
import Bubble from "../assets/error/question-bubble.png";

export default function ErrorShapes() {
  return (
    <>
      {/* Question Bubble (Hexagon Background image removed as requested) */}
      <motion.img
        src={Bubble}
        alt=""
        draggable={false}
        className="
          absolute
          -top-12
          right-0
          sm:right-4
          md:right-8
          z-30
          w-20
          sm:w-24
          md:w-28
          lg:w-32
          select-none
          pointer-events-none
        "
        animate={{
          y: [0, -15, 0],
          rotate: [-8, 8, -8]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating ? inside/over the bubble */}
      <motion.span
        className="
          absolute
          right-[32px]
          sm:right-[40px]
          md:right-[48px]
          lg:right-[68px]
          top-[10px]
          sm:top-[4px]
          z-40
          font-shrikhand
          font-black
          text-3xl
          sm:text-4xl
          md:text-5xl
          text-black
          select-none
          pointer-events-none
        "
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        ?
      </motion.span>

      {/* Spiral above head */}
      <motion.div
        className="
          absolute
          left-[48%]
          -top-20
          z-40
        "
        animate={{
          rotate: [-10, 10, -10]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="
              M38 10
              C18 10 18 35 38 35
              C58 35 58 58 38 58
              C18 58 18 76 40 76
            "
            stroke="#111"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </>
  );
}
