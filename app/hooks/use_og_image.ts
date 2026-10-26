"use client";

export const useOgImage = (githubUrl: string | null) => {
  if (!githubUrl) {
    return { ogImage: null, loading: false, error: null };
  }

  const urlParts = githubUrl.replace("https://github.com/", "").split("/");
  if (urlParts.length < 2) {
    return { ogImage: null, loading: false, error: "Invalid GitHub URL" };
  }

  const [owner, repo] = urlParts;
  return {
    ogImage: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
    loading: false,
    error: null,
  };
};
