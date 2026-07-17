import Robot from "../assets/error/robot.png";

export default function ErrorRobot() {
  return (
    <img
      src={Robot}
      alt="404 Robot"
      className="relative z-20 w-[600px] sm:w-[800px] md:w-[950px] lg:w-[1100px] xl:w-[1300px] select-none"
      draggable={false}
    />
  );
}
