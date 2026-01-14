interface ArrowIconProps {
  direction: "up" | "down";
  color: string;
  size: number;
}

export default function ArrowIcon({ direction, color, size }: ArrowIconProps) {

  const isGreen = color === "#22c55e" || color.toLowerCase() === "green";
  const isRed = color === "#ef4444" || color.toLowerCase() === "red";
  
  const animationClass = isGreen ? "arrow-animate-up" : isRed ? "arrow-animate-down" : "";
  

  const rotation = direction === "up" ? "0deg" : "180deg";
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animationClass}
        style={{ 
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) rotate(${rotation})`,
        }}
      >
        {/* Flecha hacia arriba */}
        <path
          d="M12 5L19 12H15V19H9V12H5L12 5Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
