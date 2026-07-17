import { motion } from "framer-motion";
import Robot from "../assets/error/robot.png";

export default function ErrorRobot() {
  return (
    <motion.img
      src={Robot}
      alt="404 Robot"
      className="relative z-20 w-[380px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[780px] select-none"
      draggable={false}
      animate={{
        y: [0, -10, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
