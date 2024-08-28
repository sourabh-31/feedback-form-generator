interface HeadingProps {
  heading: string;
  className?: string;
  size?: keyof typeof sizeClasses;
  weight?: keyof typeof weightClasses;
}

const sizeClasses = {
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export default function Heading({
  heading,
  className,
  size = "xl",
  weight = "medium",
}: HeadingProps) {
  return (
    <span
      role="heading"
      className={`font-kanit font-bold ${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
    >
      {heading}
    </span>
  );
}
