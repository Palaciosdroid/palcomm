"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-4 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 min-w-[72px] md:min-w-[90px] shadow-soft border border-[#daaf7a]/10">
              <span className="text-2xl md:text-4xl font-light text-[#5c4a3a]">--</span>
            </div>
            <span className="text-xs text-[#8b7b6b] mt-3">---</span>
          </div>
        ))}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Tage" },
    { value: timeLeft.hours, label: "Stunden" },
    { value: timeLeft.minutes, label: "Minuten" },
    { value: timeLeft.seconds, label: "Sekunden" },
  ];

  return (
    <div className="flex gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 min-w-[72px] md:min-w-[90px] relative overflow-hidden shadow-soft border border-[#daaf7a]/10">
            <motion.span
              key={unit.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-4xl font-light text-[#3d2c1e] block text-center"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#daaf7a]/5 pointer-events-none" />
          </div>
          <span className="text-xs text-[#8b7b6b] mt-3 tracking-wide">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
