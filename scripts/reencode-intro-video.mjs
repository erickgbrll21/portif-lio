import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(
  root,
  "..",
  "assets",
  "Robotic_hand_touching_human_hand_202606081538 - Trim.mp4"
);
const output = path.join(root, "public", "intro-background.mp4");

const command = [
  `"${ffmpegPath}"`,
  "-y",
  `-i "${input}"`,
  "-an",
  "-c:v libx264",
  "-pix_fmt yuv420p",
  "-profile:v main",
  "-level 4.0",
  "-g 6",
  "-keyint_min 6",
  "-sc_threshold 0",
  "-preset fast",
  "-crf 22",
  "-movflags +faststart",
  "-vf scale=1280:-2",
  `"${output}"`,
].join(" ");

console.log("Re-encoding intro video for scroll scrubbing...");
execSync(command, { stdio: "inherit" });
console.log(`Done: ${output} (${fs.statSync(output).size} bytes)`);
