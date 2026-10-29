"use client";

import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import playstoreDark from "../assets/svg/playstore_dark.svg";
import applestoreDark from "../assets/svg/applestore_dark.svg";
import MarkdownViewer from "./shared/markdown-viewer";
import type { Project } from "./projects";

interface DetailsProps {
  project: Project | null;
  availableInStores: string;
  screenshots: string;
  technologies: string;
  selectProject: string;
}

const playstoreSrc =
  typeof playstoreDark === "string" ? playstoreDark : playstoreDark.src;
const applestoreSrc =
  typeof applestoreDark === "string" ? applestoreDark : applestoreDark.src;

const Details: React.FC<DetailsProps> = ({
  project,
  availableInStores,
  screenshots,
  technologies,
  selectProject,
}) => {
  return (
    <section className="scrollbar-custom flex flex-1 w-full bg-(--color-card-bg) rounded-3xl flex-col overflow-y-auto">
      {project ? (
        <div className="flex flex-col gap-6 pt-4 md:pt-6 2xl:pt-8">
          <div className="flex flex-col items-center justify-start md:items-center md:flex-row gap-6 px-4 md:px-6 2xl:px-8">
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                referrerPolicy="no-referrer"
                className={
                  project.github
                    ? "w-full max-w-xs md:max-w-sm aspect-video object-cover rounded-xl shrink-0"
                    : "size-42 object-cover rounded-xl shrink-0"
                }
              />
            )}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-4xl font-bold text-(--color-text-primary) pb-2">
                {project.title}
              </h1>
              <p className="text-lg font-light text-center md:text-left text-(--color-text-secondary) leading-relaxed">
                {project.description}
              </p>
              {project.url && !project.github && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium inline-flex items-center gap-2 mt-2 text-blue-400 hover:underline break-all"
                >
                  <FaExternalLinkAlt size={18} className="shrink-0" />
                  {project.url}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-4 bg-(--color-button-bg) text-(--color-button-text) rounded-lg hover:scale-105 active:scale-95 transition-transform duration-300"
                >
                  <FaGithub size={28} />
                  <span className="font-medium">Ver no GitHub</span>
                </a>
              )}
            </div>
          </div>
          {(project.playstore || project.appstore) && (
            <div className="flex flex-col">
              <div className="hidden md:flex text-2xl font-semibold gap-6 px-4 md:px-6 2xl:px-8 mb-3">
                <h1>{availableInStores}</h1>
              </div>
              <div className="flex flex-row gap-4 px-4 md:px-6 2xl:px-8 justify-center md:justify-start">
                {project.playstore && (
                  <a
                    href={project.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={playstoreSrc}
                      alt="Play Store"
                      className="h-18"
                    />
                  </a>
                )}
                {project.appstore && (
                  <a
                    href={project.appstore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={applestoreSrc} alt="App Store" className="h-18" />
                  </a>
                )}
              </div>
            </div>
          )}
          {project.images && project.images.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-(--color-text-primary) mb-3 px-4 md:px-6 2xl:px-8">
                {screenshots}
              </h3>
              <div className="flex flex-row gap-4 overflow-x-auto pb-2 px-4 md:px-6 2xl:px-8">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto rounded-3xl object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {project.github && project.markdown && (
            <MarkdownViewer url={project.markdown} />
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-(--color-text-primary) mb-3 px-4 md:px-6 2xl:px-8">
                {technologies}
              </h3>
              <div className="flex flex-wrap gap-2 px-4 md:px-6 2xl:px-8">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="border border-(--color-text-secondary)/30 font-light px-4 py-1.5 rounded-full text-lg backdrop-blur-sm text-(--color-text-secondary)"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center w-full">
          <p className="text-(--color-text-secondary) text-center">
            {selectProject}
          </p>
        </div>
      )}
    </section>
  );
};

export default Details;
