import ArrowIcon from "./ArrowIcon";

interface ListRowProps {
  title: string;
  description?: string;
  iconColor: string;
  arrow?: "up" | "down";
  arrowSize?: number;
}

export default function ListRow({ title, iconColor, arrow, arrowSize = 32 }: ListRowProps) {
  const arrowColor = arrow === "up" ? "#22c55e" : arrow === "down" ? "#ef4444" : undefined;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 w-full h-[72px] sm:h-[88px]">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-[-15deg] sm:w-6 sm:h-6"
          >
            <path
              d="M12 4L20 8V16L12 20L4 16V8L12 4Z"
              fill={iconColor}
              opacity="0.9"
            />
            <path
              d="M12 4L20 8L12 12L4 8L12 4Z"
              fill={iconColor}
              opacity="0.6"
            />
            <path
              d="M20 8V16L12 20V12L20 8Z"
              fill={iconColor}
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h3>
      </div>
      
      <div className="flex-shrink-0 flex items-center justify-center h-full" style={{ width: arrowSize }}>
        {arrow && arrowColor && (
          <ArrowIcon direction={arrow} color={arrowColor} size={arrowSize} />
        )}
      </div>
    </div>
  );
}
