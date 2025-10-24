'use client';

import { useEffect, useState } from "react"


export default function Countdown(){
    const eventDate = new Date("2025-10-20T00:00:00")
    const [timeLeft, setTimeLeft] = useState({days:0, hours:0, minutes:0, seconds:0})

    useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = eventDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-xl sm:text-2xl font-bold mt-4 sm:mt-6 font-montserrat" role="timer" aria-live="polite">
      <p className="text-base sm:text-lg mb-2">Faltam</p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2">
        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[80px]">
          <span className="text-3xl sm:text-4xl text-primary font-bold" aria-label={`${timeLeft.days} dias`}>
            {timeLeft.days}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">dias</span>
        </div>
        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[80px]">
          <span className="text-3xl sm:text-4xl text-primary font-bold" aria-label={`${timeLeft.hours} horas`}>
            {timeLeft.hours}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">horas</span>
        </div>
        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[80px]">
          <span className="text-3xl sm:text-4xl text-primary font-bold" aria-label={`${timeLeft.minutes} minutos`}>
            {timeLeft.minutes}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">min</span>
        </div>
        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[80px]">
          <span className="text-3xl sm:text-4xl text-primary font-bold" aria-label={`${timeLeft.seconds} segundos`}>
            {timeLeft.seconds}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">seg</span>
        </div>
      </div>
    </div>
  );
}