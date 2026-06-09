import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public", "hero-background-poster.png");
const output = path.join(root, "public", "intro-background.mp4");

const filter =
  "scale=2560:1440:force_original_aspect_ratio=increase," +
  "crop=2560:1440," +
  "zoompan=z='1.02+on*0.00035':d=180:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30";

const command = [
  `"${ffmpegPath}"`,
  "-y",
  "-loop 1",
  "-framerate 30",
  `-i "${input}"`,
  `-vf "${filter}"`,
  "-t 6",
  "-c:v libx264",
  "-pix_fmt yuv420p",
  "-movflags +faststart",
  `"${output}"`,
].join(" ");

execSync(command, { stdio: "inherit" });
console.log(`Generated ${output} (${fs.statSync(output).size} bytes)`);
