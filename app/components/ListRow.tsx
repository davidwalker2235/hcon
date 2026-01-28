'use client';

import ArrowIcon from "./ArrowIcon";
import { motion } from "framer-motion";

interface ListRowProps {
  id: string;
  title: string;
  description?: string;
  arrow?: "up" | "down";
  arrowSize?: number;
  index?: number;
  completedAt?: string;
  highestLevel?: number;
  totalAttempts?: number;
}

const completedDateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const formatCompletedAt = (value?: string) => {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return completedDateFormatter.format(date);
};

export default function ListRow({
  id,
  title,
  arrow,
  arrowSize = 32,
  index = 0,
  completedAt,
  highestLevel,
  totalAttempts,
}: ListRowProps) {
  const hasMovement = arrow === "up" || arrow === "down";
  const arrowColor = arrow === "up" ? "#22c55e" : arrow === "down" ? "#ef4444" : "#2563eb";
  const displayNumber = index + 1;
  const formattedCompletedAt = formatCompletedAt(completedAt);
  const levelDisplay = highestLevel !== undefined ? highestLevel : "-";
  const attemptsDisplay = totalAttempts !== undefined ? totalAttempts : "-";

  return (
    <motion.div
      layout
      layoutId={`row-${id}`}
      initial={false}
      transition={{ type: "spring", stiffness: 220, damping: 26, duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 w-full h-[72px] sm:h-[88px]"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
        <span
          className="text-3xl sm:text-4xl font-extrabold text-black leading-none"
          aria-label={`Orden ${displayNumber}`}
        >
          {displayNumber}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h3>
      </div>

      <div className="flex-shrink-0 flex flex-col justify-center gap-0.5 text-[11px] sm:text-[12px] leading-snug text-gray-700 max-w-[200px]">
        <span className="text-[11px] font-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
          Completed at: <span className="font-normal text-gray-600 whitespace-nowrap">{formattedCompletedAt}</span>
        </span>
        <span className="text-[11px] font-semibold text-gray-900 whitespace-nowrap">
          Level: <span className="font-normal text-gray-600">{levelDisplay}</span>
        </span>
        <span className="text-[11px] font-semibold text-gray-900 whitespace-nowrap">
          Attempts: <span className="font-normal text-gray-600">{attemptsDisplay}</span>
        </span>
      </div>

      <div className="flex-shrink-0 flex items-center justify-center h-full" style={{ width: arrowSize }}>
        {hasMovement ? (
          <ArrowIcon direction={arrow!} color={arrowColor} size={arrowSize} />
        ) : (
          <span className="text-3xl font-black text-[#2563eb] leading-none">=</span>
        )}
      </div>
    </motion.div>
  );
}
