import { Suspense } from "react";
import { getAllProjectSlugs } from "../../services";
import ProjectClient, { ProjectDetailsView } from "./project-client";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

async function ProjectResolver({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProjectDetailsView slug={slug} locale="pt" />}>
      <ProjectClient slug={slug} />
    </Suspense>
  );
}

export default function ProjectPage(props: PageProps<"/projects/[slug]">) {
  return (
    <main className="flex h-dvh w-full p-2 lg:p-4">
      <Suspense fallback={<ProjectDetailsView slug="" locale="pt" />}>
        <ProjectResolver params={props.params} />
      </Suspense>
    </main>
  );
}
