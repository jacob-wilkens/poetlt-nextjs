import { useEffect, useState } from 'react';

const MID_NIGHT = '00:00:00';

export function useCountDown(): string {
  const [countdown, setCountdown] = useState(MID_NIGHT);

  useEffect(() => {
    const calculateCountdown = (): void => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60))
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
        .toString()
        .padStart(2, '0');
      const seconds = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, '0');
      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    calculateCountdown();

    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return countdown;
}
