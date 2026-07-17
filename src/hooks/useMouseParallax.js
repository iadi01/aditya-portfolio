import { useEffect } from "react";

export default function useMouseParallax() {
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 1;

        el.style.transform = `translate3d(${x * speed}px,${
          y * speed
        }px,0)`;
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
}
