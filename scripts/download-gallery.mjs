// scripts/download-gallery.mjs
// Run: node scripts/download-gallery.mjs

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGE_IDS = [
  "1P05rn6AgZCJ6ZHqMNq8vjvJ6RX73Idbt",
  "1cfPgteq3LAtzvf-L3O1O6Ik08uv3H69H",
  "1rTIbERPxMH1Gz42Pdz_IwmcG6PPYvZul",
  "1-y0CGBA2l0R5koU2_m9CZvIlc3_gC3LZ",
  "19PnMC0L5MGE1tPTXxfz3vZsD9zgJ2CBw",
  "1b01LnuEnU-4l5Vmnxplqrdo2gQ1oYBzc",
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

const THUMB_IDS = [
  "1P05rn6AgZCJ6ZHqMNq8vjvJ6RX73Idbt", // RAM JI
  "1cfPgteq3LAtzvf-L3O1O6Ik08uv3H69H",
  "1rTIbERPxMH1Gz42Pdz_IwmcG6PPYvZul",
  "1-y0CGBA2l0R5koU2_m9CZvIlc3_gC3LZ",
  "19PnMC0L5MGE1tPTXxfz3vZsD9zgJ2CBw",
  "1b01LnuEnU-4l5Vmnxplqrdo2gQ1oYBzc",
];

const OUT_DIR = path.join(__dirname, "..", "public", "media", "gallery");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const THUMB_DIR = path.join(__dirname, "..", "public", "media", "thumbs");
if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { console.log(`  ✓ exists: ${path.basename(dest)}`); return resolve(); }
    const file = fs.createWriteStream(dest);
    const get = (u) =>
      https.get(u, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
          get(res.headers.location);
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on("finish", () => { file.close(); console.log(`  ↓ ${path.basename(dest)}`); resolve(); });
        } else {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode} for ${u}`));
        }
      }).on("error", reject);
    get(url);
  });
}

async function main() {
  console.log("Downloading gallery images...");
  for (let i = 0; i < IMAGE_IDS.length; i++) {
    const id = IMAGE_IDS[i];
    const dest = path.join(OUT_DIR, `gallery_${String(i + 1).padStart(2, "0")}.jpg`);
    try {
      await downloadFile(
        `https://drive.google.com/uc?export=download&id=${id}&confirm=1`,
        dest
      );
    } catch (e) {
      console.error(`  ✗ failed g_${i+1}: ${e.message}`);
    }
  }

  console.log("\nDownloading video thumbnails...");
  for (let i = 0; i < THUMB_IDS.length; i++) {
    const id = THUMB_IDS[i];
    const dest = path.join(THUMB_DIR, `thumb_${String(i + 1).padStart(2, "0")}.jpg`);
    try {
      await downloadFile(
        `https://drive.google.com/uc?export=download&id=${id}&confirm=1`,
        dest
      );
    } catch (e) {
      console.error(`  ✗ failed t_${i+1}: ${e.message}`);
    }
  }

  console.log("\nAll done! Files saved to public/media/gallery/ and public/media/thumbs/");
}

main();
