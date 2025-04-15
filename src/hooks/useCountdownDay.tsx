import { useEffect, useState } from "react";

type Countdown = {
  day: number;
  hours: number;
  minute: number;
  second: number;
};

const getCountdown = (targetDate: Date): Countdown => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((distance / (1000 * 60)) % 60);
  const second = Math.floor((distance / 1000) % 60);

  return {
    day: Math.max(0, day),
    hours: Math.max(0, hours),
    minute: Math.max(0, minute),
    second: Math.max(0, second),
  };
};

export const useCountdownDay = (targetDate: Date): Countdown => {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getCountdown(targetDate);
      setCountdown(updated);

      if (Object.values(updated).every((v) => v === 0)) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};
