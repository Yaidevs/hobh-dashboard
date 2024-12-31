import React from "react";

export function Avatar({ children, className }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function AvatarFallback({ children }) {
  return <span className="text-xs font-medium text-gray-700">{children}</span>;
}
