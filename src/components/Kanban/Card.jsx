import React from "react";

export function Card({ children, className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-lg bg-white shadow border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`border-b p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
