import React from "react";

interface LogoProps {
  orientation?: "horizontal" | "vertical" | "iconOnly";
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
}

export default function Logo({
  orientation = "horizontal",
  size = "md",
  className = "",
  iconClassName = "",
}: LogoProps) {
  // Size-specific dimensions for the SVG icon
  const iconSizeMap = {
    sm: "h-6 w-auto sm:h-7",
    md: "h-9 w-auto sm:h-10 md:h-11",
    lg: "h-14 w-auto sm:h-16 md:h-18",
  };

  // Original transparent logo image asset matching sizes
  const renderIcon = () => (
    <img 
      src="https://lh3.googleusercontent.com/d/1wfFCGOuw9qrk7hBtSaw7YQUD7TovbCbv" 
      alt="EAW Advisory Crest" 
      className={`${iconSizeMap[size]} object-contain select-none filter drop-shadow-[0_2px_8px_rgba(197,139,7,0.3)] ${iconClassName}`}
      referrerPolicy="no-referrer"
    />
  );

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      {renderIcon()}
    </div>
  );
}
