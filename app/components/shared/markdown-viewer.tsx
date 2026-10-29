"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownViewerProps {
  url: string;
}

export default function MarkdownViewer({ url }: MarkdownViewerProps) {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Derive base URL for relative image paths
  // Assumes url is like "https://raw.githubusercontent.com/user/repo/main/README.md"
  // Base URL will be "https://raw.githubusercontent.com/user/repo/main/"
  const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch markdown");
        }
        const content = await res.text();
        setText(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    if (url) {
      fetchMarkdown();
    }
  }, [url]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!text) {
    return (
      <div className="flex items-center justify-center min-h-50 w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-white rounded-full animate-spin"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-invert prose-sm md:prose-base w-full max-w-full min-w-0 p-4 md:p-6 2xl:p-8">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          div: ({ node, ...props }) => {
            const isCenter = (props as { align?: string }).align === "center";
            return (
              <div
                {...props}
                className={`${isCenter ? "text-center " : ""}${props.className || ""}`.trim()}
              />
            );
          },
          p: ({ node, ...props }) => {
            return (
              <p
                {...props}
                className={`my-3 leading-relaxed ${props.className || ""}`.trim()}
              />
            );
          },
          a: ({ node, ...props }) => {
            return (
              <a
                {...props}
                className={`no-underline hover:underline ${props.className || ""}`.trim()}
              />
            );
          },
          img: ({ node, ...props }) => {
            let src = typeof props.src === "string" ? props.src : undefined;
            if (src && !src.startsWith("http")) {
              src = `${baseUrl}${src}`;
            }

            const isBadge = Boolean(
              src &&
                (src.includes("shields.io") ||
                  src.includes("/badge/") ||
                  src.includes("badge") ||
                  src.includes("badgen.net") ||
                  props.alt?.toLowerCase().includes("badge") ||
                  props.alt?.toLowerCase().includes("license"))
            );

            const isGif = src?.toLowerCase().endsWith(".gif");

            if (isBadge) {
              return (
                <img
                  {...props}
                  src={src}
                  className="!inline-block !my-1 !mx-1 align-middle shadow-none rounded-none max-h-8 w-auto"
                  alt={props.alt}
                  title={props.alt}
                  loading="lazy"
                />
              );
            }

            return (
              <img
                {...props}
                src={src}
                className={`max-w-full h-auto rounded-lg shadow-md block my-4 mx-auto ${
                  isGif ? "w-[50%] sm:w-[30%] lg:w-[30%] object-contain" : ""
                }`}
                alt={props.alt}
                title={props.alt}
                loading="lazy"
              />
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
