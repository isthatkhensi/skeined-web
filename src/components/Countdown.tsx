import { useEffect, useState } from "react";

// Launch target — last day of July 2026, end of day (local time).
const TARGET = new Date("2026-07-31T23:59:59").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];

  return (
    <div
      className="flex w-full items-stretch gap-1.5 rounded-[20px] border border-white/60 bg-white/40 p-2 shadow-lg shadow-black/5 backdrop-blur-md sm:gap-2 sm:p-2.5"
      role="timer"
      aria-label="Time remaining until launch"
    >
      {units.map(([label, value], i) => (
        <div key={label} className="flex flex-1 items-center">
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-white/60 px-2 py-4 sm:py-5">
            <span className="text-3xl font-bold tabular-nums text-[#2e2a27] sm:text-4xl">
              {value}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2e2a27]/60 sm:text-[11px]">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl font-light text-[#2e2a27]/30">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
