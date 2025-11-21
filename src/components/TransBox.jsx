import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./TransBox.css";

function TransBox({ type, classInfo="" }) {
  const targetDate = new Date("2025-12-12T00:00:00"); // 목표 날짜
  const [timeLeft, setTimeLeft] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        day: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hour: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2,"0"),
        minute: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
        second: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{
        type: "spring",
        bounce: 0.45,
        duration: 1.2,
        delay: 0.3,
        
      }}
      className={`momo-trust-display-regular ${classInfo}`}
    >
      {timeLeft[type]} 
      <span style={{ fontSize: "0.6rem", marginTop: "5px" }}>{type.toUpperCase()}</span>
    </motion.div>
  );
}

export default TransBox;
