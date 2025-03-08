import { motion } from "framer-motion";

const FloatingShape = ({ color = "#70c167", size = "w-10 h-10", top = "50%", left = "50%", delay = 0 }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${size} opacity-20 blur-xl`}
      style={{
        backgroundColor: color, // ✅ Ensures correct color is applied
        top: typeof top === "number" ? `${top}px` : top,
        left: typeof left === "number" ? `${left}px` : left,
      }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
