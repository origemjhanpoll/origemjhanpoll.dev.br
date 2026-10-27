"use client";

import React from "react";
import { MdAdd, MdClose } from "react-icons/md";
import image from "../assets/image/origemjhanpoll.jpeg";
import GeometricBackground from "./geometric-background";

interface SkillCategory {
  title: string;
  skills: string[];
}

interface ProfileProps {
  username: string;
  greeting: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  skills?: SkillCategory[];
  skillsTitle?: string;
  photoUrl: string;
  buttons: { text: string; url: string }[];
  flag: string | { src: string };
  onClickFlag: () => void;
  currentYear?: number;
  children?: React.ReactNode;
}

const MOBILE_START_YEAR = 2019;
const defaultProfileImageSrc = typeof image === "string" ? image : image.src;

const CloseDivider: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex w-full items-center gap-3">
    <span className="h-px flex-1 bg-(--color-text-secondary)/30"></span>
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="flex size-12 items-center justify-center rounded-full bg-(--color-button-bg) text-(--color-button-text) transition hover:scale-105 active:scale-95 cursor-pointer duration-300"
    >
      <MdClose size={22} />
    </button>
    <span className="h-px flex-1 bg-(--color-text-secondary)/30"></span>
  </div>
);

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const [showSkills, setShowSkills] = React.useState(false);
  const hasSkills = !!props.skills && props.skills.length > 0;
  const activeYear = props.currentYear ?? new Date().getFullYear();
  const yearsOfExperience = activeYear - MOBILE_START_YEAR;
  const description = props.description.replace(
    "{years}",
    String(yearsOfExperience)
  );
  const flagSrc =
    typeof props.flag === "string" ? props.flag : props.flag.src;

  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleCloseSkills = () => {
    setShowSkills(false);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="profile-section"
      className="relative flex flex-1 flex-col bg-(--color-card-bg) rounded-3xl overflow-hidden"
    >
      <div className="absolute z-0 top-0 w-full h-[45%] sm:h-[60%]">
        <img
          src={props.photoUrl || defaultProfileImageSrc}
          alt={`${props.name}'s profile`}
          className={`w-full h-full object-cover object-bottom transition-opacity duration-300 ${
            showSkills ? "opacity-10" : "opacity-100"
          }`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--color-card-bg) via-(--color-card-bg)/50 to-(--color-card-bg)/10"></div>
      </div>
      <GeometricBackground className="absolute inset-0 w-full h-full opacity-0 animate-[fadeIn_2s_ease-in_forwards]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-(--color-card-bg) to-transparent pointer-events-none"></div>

      <div
        ref={contentRef}
        className="scrollbar-custom relative z-10 flex flex-1 flex-col sm:items-start items-center justify-start text-(--color-text-primary) font-sans md:text-start text-start md:overflow-y-auto tall:overflow-y-auto p-4 md:p-6 2xl:p-8 sm:pt-48 pt-48"
      >
        <div className="flex flex-col justify-center items-center sm:items-start mt-auto">
          <span className="text-md font-medium text-(--color-text-secondary)">
            @{props.username}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-(--color-text-primary) md:text-start text-center">
            {props.greeting}
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold mb-1 text-(--color-text-primary) md:text-start text-center">
            {props.name}
          </h1>
        </div>
        <div className="my-4 wrap-break-words sm:text-start text-center leading-tight">
          <span className="font-medium text-(--color-text-primary) pr-1">
            {props.role}
          </span>
          <span className="font-light text-(--color-text-secondary) leading-tight">
            {description}
          </span>
        </div>
        {hasSkills && showSkills ? (
          <CloseDivider onClose={() => setShowSkills(false)} />
        ) : (
          <div className="font-light flex flex-wrap gap-2 justify-center sm:justify-start">
            {props.tags.map((tag, index) => (
              <span
                key={index}
                className="border border-(--color-text-secondary)/30 font-light px-4 py-1.5 rounded-full text-sm backdrop-blur-sm text-(--color-text-secondary)"
              >
                {tag}
              </span>
            ))}
            {hasSkills && (
              <button
                type="button"
                onClick={() => setShowSkills(true)}
                aria-label={props.skillsTitle}
                aria-expanded={showSkills}
                title={props.skillsTitle}
                className="flex items-center justify-center size-8 rounded-full bg-(--color-button-bg) text-(--color-button-text) transition hover:scale-105 active:scale-95 cursor-pointer duration-300"
              >
                <MdAdd size={18} />
              </button>
            )}
          </div>
        )}
        {hasSkills && showSkills && (
          <div className="w-full mt-5 flex flex-col gap-5 animate-[slideUp_0.3s_ease-out]">
            {props.skills!.map((category) => (
              <div key={category.title} className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-(--color-text-primary) text-center sm:text-start">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="border border-(--color-text-secondary)/30 font-light px-4 py-1.5 rounded-full text-sm backdrop-blur-sm text-(--color-text-primary)"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <CloseDivider onClose={handleCloseSkills} />
          </div>
        )}
        {props.children && (
          <div className="flex md:flex lg:hidden w-full flex-row items-center gap-4 pb-2 pt-10">
            {props.children}
          </div>
        )}
      </div>
      {hasSkills && showSkills && (
        <button
          type="button"
          onClick={() => setShowSkills(false)}
          aria-label="Close"
          className="absolute z-30 top-1 right-1 size-10 flex justify-center items-center rounded-full bg-(--color-button-bg) text-(--color-button-text) transition hover:scale-105 active:scale-95 cursor-pointer duration-300"
        >
          <MdClose size={22} />
        </button>
      )}

      <div
        onClick={props.onClickFlag}
        className="absolute z-20 top-1 left-1 size-10 flex justify-center items-center p-0.5 border-(--color-card-bg)/30 bg-(--color-text-secondary)/30 rounded-full backdrop-blur-sm transition hover:scale-105 active:scale-95 cursor-pointer duration-300"
      >
        <img
          src={flagSrc}
          alt="flag"
          className="size-full rounded-full object-cover"
        />
      </div>
    </section>
  );
};

export default Profile;
