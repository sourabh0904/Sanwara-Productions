/**
 * Fetches every gallery image from Google Drive CDN,
 * computes a SHA-256 hash of the response body,
 * and reports which IDs are content-identical.
 *
 * Run: node scripts/find-duplicate-images.mjs
 */

import { createHash } from "crypto";

const IMAGE_IDS = [
  "1XFqgDdIBylhWNrG-3ol0fyM2ONqABBAN",
  "1wWBsHQ00ZopG5BJ45RgV3Cqo61Nd7szm",
  "1xQigb0Hm8LCOAHPd9f7R2yJk_P9ptNsg",
  "1paXC3mHYAWgHUkKV9zOz5elN0mBVh4tj",
  "1rHBN7yMWnMLAdLqErkA7BltKJh8c0W4t",
  "1yeOWKDUahz1lBRLMDrz9lY6ljbRrwBJ3",
  "1OLxsmonkvsion4-v1qSkPLjSg9d5yjrV",
  "1tG_7ok3_p76-uwddrgw40acxoyET4fw5",
  "1-6iDdZrFBvg6XsHEMK-vbrtzj1Jtrg8P",
  "1N2cNESE3F1fXmmquIQ0Vds18kvDgaKnb",
  "1_SHKC7oK8U24To120ZsF7jUD-6AfnAAE",
  "1ORPNIgWI6Uu9RVFp7_ZibwAE5v6O5Vu_",
  "1NpfkJiytU89Zpg0Mup7GBGKSlQYAXV_Z",
  "1HSfEYft9hlpww3m86gOuyz0LBaZKGUpW",
  "1beric7WO1tpv-aq9PHDtdE_THAVsf86i",
  "1cDAwb4ypDwwlxYW5iBbojB8cJYnjGAOX",
  "12NKvMkji2tJgQUsHUD87Aqur0sKieJT-",
  "171y11Os7WcM2dlQFU7qyPwDC9qkAQht9",
  "18jsm_D2OdEuSPFkCJDsjGO9FLP24mlO2",
  "1iv3tRSlHRgW022R-wUptGpN3lxceUyGa",
  "19iqobFvX_tkEONutSWb9pGGv1txobbkU",
  "1pJX1ZZsbjv_OejjlA--xeaiKOyPI4NP1",
  "1Rvnz8KagiIpSEvYtSlEI9ji6nUFf0P8M",
  "1_nKsVI2LUFhGcWxvNBSvmRURo6-aTXtB",
  "10wXdX-FpxZHXe1g8O3V1oo132QVrlZh0",
  "1sTCuhkCWLClUZcQqgZtqQNqfg4PWx1Qf",
  "1bN4wR62DBmCrC1sLuzMq2frrWjJ75foC",
  "1TBNpbTLoDHOreH5WtWsi9BHa215HWTee",
];

const imgUrl = (id) => `https://lh3.googleusercontent.com/d/${id}`;

async function fetchHash(id) {
  const url = imgUrl(id);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });
    if (!res.ok) return { id, hash: null, size: 0, error: res.status };
    const buf = await res.arrayBuffer();
    const hash = createHash("sha256").update(Buffer.from(buf)).digest("hex");
    return { id, hash, size: buf.byteLength, error: null };
  } catch (e) {
    return { id, hash: null, size: 0, error: e.message };
  }
}

// Fetch in batches of 5 to avoid rate-limiting
async function batchFetch(ids, batchSize = 5) {
  const results = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    process.stdout.write(`Fetching ${i + 1}–${Math.min(i + batchSize, ids.length)} / ${ids.length} ...\r`);
    const batchResults = await Promise.all(batch.map(fetchHash));
    results.push(...batchResults);
    if (i + batchSize < ids.length) await new Promise(r => setTimeout(r, 300));
  }
  console.log("\nDone fetching.\n");
  return results;
}

const results = await batchFetch(IMAGE_IDS);

// Group by hash
const byHash = {};
for (const r of results) {
  if (!r.hash) {
    console.warn(`⚠️  Could not fetch ${r.id} — ${r.error}`);
    continue;
  }
  if (!byHash[r.hash]) byHash[r.hash] = [];
  byHash[r.hash].push(r);
}

// Find groups with more than 1 ID (= duplicate content)
const dupeGroups = Object.values(byHash).filter(g => g.length > 1);

if (dupeGroups.length === 0) {
  console.log("✅  No duplicate images found.");
} else {
  console.log(`❌  Found ${dupeGroups.length} duplicate group(s):\n`);
  const toRemove = [];
  for (const group of dupeGroups) {
    console.log(`  Same image (${(group[0].size / 1024).toFixed(1)} KB):`);
    // Keep the first, mark the rest for removal
    const [keep, ...remove] = group;
    console.log(`    KEEP   → ${keep.id}`);
    remove.forEach(r => {
      console.log(`    REMOVE → ${r.id}`);
      toRemove.push(r.id);
    });
    console.log();
  }
  console.log("IDs to remove from IMAGE_IDS in Gallery.tsx:");
  console.log(JSON.stringify(toRemove, null, 2));
}
