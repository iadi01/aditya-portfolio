import Robot from "../assets/error/robot.png";

export default function ErrorRobot() {
  return (
    <img
      src={Robot}
      alt="404 Robot"
      className="relative z-20 w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[1150px] xl:w-[1350px] max-w-full lg:max-w-none h-auto select-none mx-auto block"
      draggable={false}
    />
  );
}
