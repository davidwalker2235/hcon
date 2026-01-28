'use client';

import ArrowIcon from "./ArrowIcon";
import { motion } from "framer-motion";

interface ListRowProps {
  id: string;
  title: string;
  description?: string;
  iconColor: string;
  arrow?: "up" | "down";
  arrowSize?: number;
  index?: number;
}

export default function ListRow({ id, title, iconColor, arrow, arrowSize = 32, index = 0 }: ListRowProps) {
  const arrowColor = arrow === "up" ? "#22c55e" : arrow === "down" ? "#ef4444" : undefined;
  const isColored = index < 3;
  const iconStrokeColor = isColored ? iconColor : "#000000";
  const iconFillColor = isColored ? iconColor : "#ffffff";
  
  const displayNumber = index + 1;

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
      
      <div className="flex-shrink-0 flex items-center justify-center h-full" style={{ width: arrowSize }}>
        {arrow && arrowColor && (
          <ArrowIcon direction={arrow} color={arrowColor} size={arrowSize} />
        )}
      </div>
    </motion.div>
  );
}
