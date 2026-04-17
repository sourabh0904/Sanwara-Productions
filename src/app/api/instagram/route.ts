import { NextResponse } from "next/server";

export interface InstagramReel {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  account: "sanwara" | "malwa";
}

const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";

async function fetchReels(token: string, account: InstagramReel["account"]): Promise<InstagramReel[]> {
  const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&access_token=${token}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) return [];

  const json = await res.json();
  if (!json.data) return [];

  return (json.data as InstagramReel[])
    .filter((item) => item.media_type === "REEL" || item.media_type === "VIDEO")
    .map((item) => ({ ...item, account }));
}

export async function GET() {
  const tokenSanwara = process.env.INSTAGRAM_TOKEN_SANWARA;
  const tokenMalwa   = process.env.INSTAGRAM_TOKEN_MALWA;

  const results = await Promise.allSettled([
    tokenSanwara ? fetchReels(tokenSanwara, "sanwara") : Promise.resolve([]),
    tokenMalwa   ? fetchReels(tokenMalwa,   "malwa")   : Promise.resolve([]),
  ]);

  const reels: InstagramReel[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  // Interleave reels from both accounts so they're not grouped by account
  const sanwara = reels.filter((r) => r.account === "sanwara");
  const malwa   = reels.filter((r) => r.account === "malwa");
  const interleaved: InstagramReel[] = [];
  const max = Math.max(sanwara.length, malwa.length);
  for (let i = 0; i < max; i++) {
    if (sanwara[i]) interleaved.push(sanwara[i]);
    if (malwa[i])   interleaved.push(malwa[i]);
  }

  return NextResponse.json({ reels: interleaved });
}
