interface ArrowIconProps {
  direction: "up" | "down";
  color: string;
  size: number;
}

export default function ArrowIcon({ direction, color, size }: ArrowIconProps) {
  const isUp = direction === "up";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: isUp ? "rotate(0deg)" : "rotate(180deg)" }}
    >
      {/* Flecha hacia arriba */}
      <path
        d="M12 5L19 12H15V19H9V12H5L12 5Z"
        fill={color}
      />
    </svg>
  );
}
