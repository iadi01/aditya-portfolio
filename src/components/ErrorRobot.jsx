import { motion } from "framer-motion";
import Robot from "../assets/error/robot.png";

export default function ErrorRobot() {
  return (
    <motion.img
      src={Robot}
      alt="404 Robot"
      className="relative z-20 w-[250px] sm:w-[340px] md:w-[430px] lg:w-[520px] xl:w-[620px] select-none"
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
