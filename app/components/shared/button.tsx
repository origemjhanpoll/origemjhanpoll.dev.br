"use client";

import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isFull?: boolean;
  color?: string;
  label?: string;
  outline?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  isFull,
  color = "bg-(--color-primary)",
  label,
  outline = false,
  href,
  target,
  rel,
  className = "",
  ...props
}) => {
  const variant = outline
    ? "border border-(--color-text-secondary)/30 backdrop-blur-sm text-(--color-text-secondary)"
    : `${color} text-(--color-card-bg)`;

  const baseClassName = `${isFull ? "w-full" : ""} ${variant} flex min-h-16 items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition hover:scale-105 active:scale-95 cursor-pointer duration-300 whitespace-nowrap ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={baseClassName}
      >
        {icon}
        {label && <span className="hidden xl:flex tall:flex">{label}</span>}
      </a>
    );
  }

  return (
    <button
      className={baseClassName}
      {...props}
    >
      {icon}
      {label && <span className="hidden xl:flex tall:flex">{label}</span>}
    </button>
  );
};

export default Button;
