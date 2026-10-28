"use client";

import React, { useEffect, useState } from "react";
import localImage from "../assets/image/local_image.png";

interface LocalProps {
  address?: string;
  label: string;
  mapUrl?: string;
}

const localImageSrc =
  typeof localImage === "string" ? localImage : localImage.src;

const DEFAULT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=São+Luís,+Maranhão";

export const Local: React.FC<LocalProps> = ({
  address,
  label,
  mapUrl = DEFAULT_MAP_URL,
}) => {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const offset = -now.getTimezoneOffset() / 60;
      const sign = offset >= 0 ? "+" : "-";
      const gmt = `GMT${sign}${Math.abs(offset)}`;

      setTimeString(`${time} ${gmt}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      id="local-section"
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Abrir mapa de São Luís, Maranhão"
      className="group relative block overflow-hidden bg-(--color-card-bg) rounded-3xl cursor-pointer transition-colors duration-300 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
    >
      <div className="relative z-10 flex flex-col justify-center text-(--color-text-primary) p-4 md:p-6 2xl:p-8 lg:max-[1100px]:text-xs">
        {address && <h1 className="font-semibold">{address}</h1>}
        <p className="text-(--color-text-secondary) font-light">
          {timeString} {label}
        </p>
      </div>
      <img
        src={localImageSrc}
        alt="Image local"
        className="absolute right-0 top-0 h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="md:hidden xl:flex absolute top-1/2 right-[20%] -translate-y-1/2 items-center justify-center">
        <span className="relative flex size-8 items-center justify-center">
          <span className="animate-ping absolute inline-flex size-8 rounded-full bg-(--color-primary) opacity-75"></span>
          <span className="absolute inline-flex size-16 rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_80%)] opacity-20"></span>
          <span className="relative inline-flex rounded-full size-4 bg-(--color-primary)"></span>
        </span>
      </div>
    </a>
  );
};

export default Local;
