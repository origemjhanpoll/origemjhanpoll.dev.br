"use client";

import { useSearchParams } from "next/navigation";
import { Details } from "../../components";
import { getProjectBySlug } from "../../services";

export function ProjectDetailsView({
  slug,
  locale = "pt",
}: {
  slug: string;
  locale?: string;
}) {
  const { project, translations } = getProjectBySlug(slug, locale);

  return (
    <Details
      project={project}
      availableInStores={translations.availableInStores}
      screenshots={translations.screenshots}
      technologies={translations.technologies}
      selectProject={translations.selectProject}
    />
  );
}

export default function ProjectClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const locale = searchParams.get("lang") ?? "pt";

  return <ProjectDetailsView slug={slug} locale={locale} />;
}
