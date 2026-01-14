import ArrowIcon from "./ArrowIcon";

interface ListRowProps {
  title: string;
  description?: string;
  iconColor: string;
  arrow?: "up" | "down";
  arrowSize?: number;
  index?: number;
}

export default function ListRow({ title, iconColor, arrow, arrowSize = 32, index = 0 }: ListRowProps) {
  const arrowColor = arrow === "up" ? "#22c55e" : arrow === "down" ? "#ef4444" : undefined;
  const isColored = index < 3;
  const iconStrokeColor = isColored ? iconColor : "#000000";
  const iconFillColor = isColored ? iconColor : "#ffffff";
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 w-full h-[72px] sm:h-[88px]">
      <div className="flex-shrink-0 flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 sm:w-14 sm:h-14"
        >
            {/* Código binario de fondo */}
            <text
              x="2"
              y="5"
              fontSize="2.5"
              fill={iconStrokeColor}
              opacity="0.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              01
            </text>
            <text
              x="19"
              y="5"
              fontSize="2.5"
              fill={iconStrokeColor}
              opacity="0.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              10
            </text>
            <text
              x="2"
              y="8"
              fontSize="2.5"
              fill={iconStrokeColor}
              opacity="0.4"
              fontFamily="monospace"
              fontWeight="bold"
            >
              11
            </text>
            <text
              x="19"
              y="8"
              fontSize="2.5"
              fill={iconStrokeColor}
              opacity="0.4"
              fontFamily="monospace"
              fontWeight="bold"
            >
              00
            </text>
            
            {/* Figura encapuchada - cabeza */}
            <circle
              cx="12"
              cy="7"
              r="2.5"
              fill="none"
              stroke={iconStrokeColor}
              strokeWidth="1.5"
            />
            {/* Capucha */}
            <path
              d="M9 7C9 8.5 10.5 10 12 10C13.5 10 15 8.5 15 7"
              stroke={iconStrokeColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M9 7L8 9L7 11"
              stroke={iconStrokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M15 7L16 9L17 11"
              stroke={iconStrokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cuerpo */}
            <path
              d="M10 11L12 13L14 11"
              stroke={iconStrokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Laptop - pantalla */}
            <rect
              x="5"
              y="14"
              width="14"
              height="8"
              rx="1"
              fill={iconFillColor}
              stroke={iconStrokeColor}
              strokeWidth="1.5"
            />
            {/* Pantalla del laptop */}
            <rect
              x="6.5"
              y="15.5"
              width="11"
              height="5"
              fill={isColored ? "rgba(0,0,0,0.4)" : "#000000"}
              rx="0.5"
            />
            {/* Base del laptop */}
            <rect
              x="6"
              y="21"
              width="12"
              height="1.5"
              fill={iconStrokeColor}
              rx="0.5"
            />
            
            {/* Más código binario abajo */}
            <text
              x="2"
              y="20"
              fontSize="2.5"
              fill={iconStrokeColor}
              opacity="0.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              01
            </text>
            <text
              x="19"
              y="20"
              fontSize="2.5"
              fill={iconStrokeColor}
              opacity="0.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              10
            </text>
          </svg>
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
