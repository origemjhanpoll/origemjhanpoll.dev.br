"use client";

import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isFull?: boolean;
  color?: string;
  label?: string;
  outline?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  isFull,
  color = "bg-(--color-primary)",
  label,
  outline = false,
  ...props
}) => {
  const variant = outline
    ? "border border-(--color-text-secondary)/30 backdrop-blur-sm text-(--color-text-secondary)"
    : `${color} text-(--color-card-bg)`;

  return (
    <button
      className={`${isFull ? "w-full" : ""} ${variant} flex min-h-16 items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition hover:scale-105 active:scale-95 cursor-pointer duration-300 whitespace-nowrap`}
      {...props}
    >
      {icon}
      {label && <span className="hidden xl:flex tall:flex">{label}</span>}
    </button>
  );
};

export default Button;
