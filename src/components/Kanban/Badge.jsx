import React from "react";

export function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
