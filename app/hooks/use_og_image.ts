"use client";

import { useState, useEffect } from "react";

const initialOgCache: Record<string, string> = {
  "https://github.com/origemjhanpoll/origemjhanpoll.dev.br":
    "https://repository-images.githubusercontent.com/1093891924/fde3dd1a-21bd-4652-bd44-085324b5b43a",
  "https://github.com/origemjhanpoll/App-GitUsers":
    "https://repository-images.githubusercontent.com/914074621/13bf09f2-0555-41e4-abf9-399e9476207c",
  "https://github.com/origemjhanpoll/App-CepSearch":
    "https://repository-images.githubusercontent.com/1048163840/08d0b667-6180-4bcd-ae9d-9dbbcb23a7ab",
  "https://github.com/origemjhanpoll/App-PostsFeed":
    "https://repository-images.githubusercontent.com/934974648/8517f592-1fa0-4b7f-a3ac-1b63925fd57c",
  "https://github.com/origemjhanpoll/App-Criptomoedas":
    "https://repository-images.githubusercontent.com/932491790/3202c2b6-9288-4876-97b0-663c17947dca",
  "https://github.com/origemjhanpoll/App-Cards":
    "https://repository-images.githubusercontent.com/926860241/7b7f81cd-f73f-4209-a622-c86c05b6c930",
  "https://github.com/origemjhanpoll/App-MotelsNearby":
    "https://repository-images.githubusercontent.com/928458557/f25dda69-f262-4359-bc25-e3226b2dc6b8",
  "https://github.com/origemjhanpoll/App-YandehExpress":
    "https://repository-images.githubusercontent.com/893542888/49627050-326e-446e-bc9b-0d8f97bff249",
};

const ogCache = new Map<string, string>(Object.entries(initialOgCache));

export const useOgImage = (githubUrl: string | null) => {
  const normalizedUrl = githubUrl ? githubUrl.trim().replace(/\/$/, "") : null;

  const [ogImage, setOgImage] = useState<string | null>(() => {
    if (!normalizedUrl) return null;
    return ogCache.get(normalizedUrl) || null;
  });
  const [loading, setLoading] = useState<boolean>(!ogImage && !!normalizedUrl);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!normalizedUrl) {
      setOgImage(null);
      setLoading(false);
      return;
    }

    if (ogCache.has(normalizedUrl)) {
      setOgImage(ogCache.get(normalizedUrl)!);
      setLoading(false);
      return;
    }

    const urlParts = normalizedUrl.replace("https://github.com/", "").split("/");
    if (urlParts.length < 2) {
      setError("Invalid GitHub URL");
      setLoading(false);
      return;
    }

    const [owner, repo] = urlParts;
    const fallback = `https://opengraph.githubassets.com/1/${owner}/${repo}`;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/og?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          const img = data.ogImage || fallback;
          ogCache.set(normalizedUrl, img);
          setOgImage(img);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          ogCache.set(normalizedUrl, fallback);
          setOgImage(fallback);
          setError(err instanceof Error ? err.message : "Error");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [normalizedUrl]);

  return { ogImage, loading, error };
};
