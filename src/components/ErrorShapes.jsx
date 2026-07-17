import { motion } from "framer-motion";
import HexShape from "../assets/error/hex-shape.png";
import Bubble from "../assets/error/question-bubble.png";

export default function ErrorShapes() {
  return (
    <>
      {/* Hexagon Background */}
      <motion.img
        src={HexShape}
        alt=""
        draggable={false}
        className="
          absolute
          z-0
          w-[230px]
          sm:w-[330px]
          md:w-[420px]
          lg:w-[520px]
          select-none
          pointer-events-none
        "
        animate={{
          scale: [1, 1.03, 1],
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Question Bubble wrapper containing both image and floating question mark */}
      <motion.div
        className="
          absolute
          -top-8
          right-5
          z-30
          w-16
          sm:w-20
          md:w-24
          lg:w-28
          h-auto
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
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={Bubble}
            alt=""
            draggable={false}
            className="w-full h-full select-none pointer-events-none"
          />
          {/* Floating ? positioned over the yellow bubble */}
          <motion.span
            className="
              absolute
              top-[20%]
              left-[45%]
              transform -translate-x-1/2 -translate-y-1/2
              z-40
              font-shrikhand
              font-black
              text-3xl
              sm:text-4xl
              md:text-5xl
              text-black
              select-none
            "
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ?
          </motion.span>
        </div>
      </motion.div>

      {/* Spiral above head */}
      <motion.div
        className="
          absolute
          left-[48%]
          -top-14
          z-40
        "
        animate={{
          rotate: [-10, 10, -10],
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
