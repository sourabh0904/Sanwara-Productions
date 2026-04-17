import { NextResponse } from "next/server";

const CODES = [
  "DVqoRb2iqk0","DSPwvV_E7ZN","DRz9kljE0qs","DOy3RcoCqKE","DOYbDNDj8Ic",
  "DNyEEkyQnZJ","DNuoGf_ZqNg","DNuklxE2rhw","DNuQgXl1C2S","DNoGoTvzEIf",
  "DNkzn8SqFsG","DMCJExbKFeU","DLshE-dqZC3","DJUsiifzy1G","DJL40b3pAeo",
  "DGqww_nKZx1","DGaT1SFz6wq","DEwwfjCzVLo","C-Nv2JuSEwN","C-ILn6To2gr",
  "C-GMRaAoYIo","C98B1phSQpL","C97g2fgy_dA","C960OL9pkw3","C9wOMXTpDup",
  "C9myXSrSoOf","C9cnY__tUHB",
];

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function fetchThumbnail(code: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.instagram.com/p/${code}/embed/`, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Try patterns from most specific to least
    const patterns = [
      /"thumbnail_url":"(https?:[^"]+)"/,
      /"display_url":"(https?:[^"]+)"/,
      /thumbnailUrl\\":\\"(https?:[^\\]+)\\"/,
      /"src":"(https?:\/\/[^"]*cdninstagram[^"]+)"/,
      /property="og:image"\s+content="([^"]+)"/,
      /content="([^"]+)"\s+property="og:image"/,
    ];

    for (const pat of patterns) {
      const m = html.match(pat);
      if (m?.[1]) {
        return m[1]
          .replace(/\\u0026/g, "&")
          .replace(/\\u002F/g, "/")
          .replace(/\\\//g, "/")
          .replace(/\\"/g, '"');
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  const entries = await Promise.all(
    CODES.map(async (code) => [code, await fetchThumbnail(code)])
  );
  const thumbnails = Object.fromEntries(entries.filter(([, v]) => v));
  return NextResponse.json({ thumbnails });
}
