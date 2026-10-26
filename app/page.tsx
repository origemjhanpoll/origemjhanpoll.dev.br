import { Suspense } from "react";
import { cacheLife } from "next/cache";
import HomeClient, { HomeView } from "./home-client";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Home() {
  const currentYear = await getCurrentYear();

  return (
    <Suspense fallback={<HomeView locale="pt" currentYear={currentYear} />}>
      <HomeClient currentYear={currentYear} />
    </Suspense>
  );
}
