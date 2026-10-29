import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let owner = searchParams.get("owner");
  let repo = searchParams.get("repo");
  const path = searchParams.get("path");
  const urlParam = searchParams.get("url");

  if (urlParam) {
    const parts = urlParam.replace("https://github.com/", "").replace(/\/$/, "").split("/");
    owner = parts[0];
    repo = parts[1];
  } else if (path) {
    const parts = path.replace(/^\/+/, "").replace(/\/$/, "").split("/");
    owner = parts[0];
    repo = parts[1];
  }

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner and repo parameters" },
      { status: 400 }
    );
  }

  const fallbackUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`;

  try {
    const targetUrl = `https://github.com/${owner}/${repo}`;
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ogImage: fallbackUrl },
        {
          headers: {
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        }
      );
    }

    const html = await response.text();

    const ogMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
      html.match(/<meta[^>]*name=["']twitter:image:src["'][^>]*content=["']([^"']+)["']/i);

    const ogImage = ogMatch && ogMatch[1] ? ogMatch[1] : fallbackUrl;

    return NextResponse.json(
      { ogImage },
      {
        headers: {
          "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { ogImage: fallbackUrl, error: (error as Error).message },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }
}
