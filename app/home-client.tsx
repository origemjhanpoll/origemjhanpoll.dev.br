"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

import {
  Social,
  Main,
  Projects,
  Local,
  Profile,
  Button,
  Experience,
} from "./components";
import {
  getProfileService,
  getProjectsService,
  getMainService,
  getSocialService,
  getExperienceService,
} from "./services";
import { slugify } from "./utils/slugify";

import iconBR from "./assets/png/br.png";
import iconCN from "./assets/png/cn.png";
import iconUS from "./assets/png/us.png";

const flags = [
  { icon: iconBR, locale: "pt" },
  { icon: iconUS, locale: "en" },
  { icon: iconCN, locale: "cn" },
];

export function HomeView({
  locale = "pt",
  currentYear = 2026,
  onFlagClick,
  onProjectClick,
}: {
  locale?: string;
  currentYear?: number;
  onFlagClick?: () => void;
  onProjectClick?: (projectTitle: string) => void;
}) {
  const currentFlagIndex = Math.max(
    0,
    flags.findIndex((flag) => flag.locale === locale)
  );
  const resolvedLocale = flags[currentFlagIndex].locale;

  const profileData = getProfileService(resolvedLocale);
  const mainData = getMainService(resolvedLocale);
  const socialData = getSocialService(resolvedLocale);
  const projectsData = getProjectsService(resolvedLocale);
  const experienceData = getExperienceService(resolvedLocale);

  return (
    <div className="home-grid-container">
      <div id="home-grid-content-1">
        <Profile
          username={profileData.username}
          greeting={profileData.greeting}
          name={profileData.name}
          role={profileData.role}
          description={profileData.description}
          tags={profileData.tags}
          skills={profileData.skills}
          skillsTitle={profileData.skillsTitle}
          photoUrl={profileData.photo}
          buttons={profileData.buttons}
          flag={flags[currentFlagIndex].icon}
          onClickFlag={onFlagClick ?? (() => {})}
          currentYear={currentYear}
        >
          <Button
            onClick={() => window.open(profileData.buttons[0].url, "_blank")}
            icon={<FaWhatsapp size={24} />}
            label={profileData.buttons[0].text}
            isFull
          />
          <Button
            onClick={() => window.open(profileData.buttons[1].url, "_blank")}
            outline={true}
            icon={<MdOutlineFileDownload size={24} />}
          />
        </Profile>
      </div>

      <div id="home-grid-content-2">
        <Local
          address={profileData.address}
          label={profileData.localTimeLabel}
        />
        <Main title={mainData.title} description={mainData.description}>
          <Button
            onClick={() => window.open(profileData.buttons[0].url, "_blank")}
            icon={<FaWhatsapp size={24} />}
            label={profileData.buttons[0].text}
          />
          <Button
            onClick={() => window.open(profileData.buttons[1].url, "_blank")}
            outline={true}
            icon={<MdOutlineFileDownload size={24} />}
          />
        </Main>
        <Social
          icons={socialData.links.map((link) => {
            const iconMap: { [key: string]: React.ReactNode } = {
              LinkedIn: <FaLinkedin className="size-12" />,
              GitHub: <FaGithub className="size-12" />,
              Instagram: <FaInstagram className="size-12" />,
              Telegram: <FaTelegram className="size-12" />,
            };
            return {
              icon: iconMap[link.name],
              href: link.url,
              label: link.label,
            };
          })}
        />
      </div>

      <div id="home-grid-content-3">
        <Experience
          title={experienceData.title}
          yearLabel={experienceData.yearLabel}
          yearsLabel={experienceData.yearsLabel}
          items={experienceData.items}
          currentYear={currentYear}
        />
        <Projects
          titleProfessional={projectsData.professional.title}
          titlePersonal={projectsData.personal.title}
          allLabel={projectsData.translations.filterAll}
          noResultsLabel={projectsData.translations.noProjectsFound}
          professionalProjects={projectsData.professional.items}
          personalProjects={projectsData.personal.items}
          onClick={(project) => {
            onProjectClick?.(project.title);
          }}
        />
      </div>
    </div>
  );
}

export default function HomeClient({ currentYear }: { currentYear: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const localeFromUrl = searchParams.get("lang") ?? "pt";
  const currentFlagIndex = Math.max(
    0,
    flags.findIndex((flag) => flag.locale === localeFromUrl)
  );
  const locale = flags[currentFlagIndex].locale;

  const handleFlagClick = () => {
    const nextIndex = (currentFlagIndex + 1) % flags.length;
    router.replace(`?lang=${flags[nextIndex].locale}`, { scroll: false });
  };

  const handleProjectClick = (projectTitle: string) => {
    router.push(`/projects/${slugify(projectTitle)}?lang=${locale}`);
  };

  return (
    <HomeView
      locale={locale}
      currentYear={currentYear}
      onFlagClick={handleFlagClick}
      onProjectClick={handleProjectClick}
    />
  );
}
