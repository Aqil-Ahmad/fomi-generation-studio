import { ASPECT_RATIOS, COUNTS, MODELS } from "./options";
import { mediaPool } from "./media";

const DURATION_MS = { image: [2400, 3600], video: [4200, 5800] };
const QUEUE_MS = 400;

function hash(text) {
  let value = 0;
  for (const char of text) value = (value * 31 + char.charCodeAt(0)) >>> 0;
  return value;
}

export function validateRequest({ prompt, mode, count, aspectRatio, model }) {
  if (typeof prompt !== "string" || !prompt.trim()) return "Describe what you want to create.";
  if (!MODELS[mode]) return "Pick image or video.";
  if (!COUNTS.includes(count)) return "Pick between 1 and 4 results.";
  if (!ASPECT_RATIOS.some((ratio) => ratio.value === aspectRatio)) return "Pick a supported aspect ratio.";
  if (!MODELS[mode].some((option) => option.value === model)) return "Pick a model for this mode.";
  return null;
}

export function encodeJob(job) {
  return Buffer.from(JSON.stringify(job)).toString("base64url");
}

export function decodeJob(jobId) {
  try {
    const job = JSON.parse(Buffer.from(jobId, "base64url").toString());
    return typeof job.startedAt === "number" && validateRequest(job) === null ? job : null;
  } catch {
    return null;
  }
}

export function jobSnapshot(jobId, job, now) {
  const seed = hash(`${job.prompt}:${job.startedAt}`);
  const [minMs, maxMs] = DURATION_MS[job.mode];
  const duration = minMs + (seed % (maxMs - minMs));
  const elapsed = now - job.startedAt - QUEUE_MS;

  if (elapsed < 0) return { status: "queued", progress: 0, results: [] };
  if (job.fail && elapsed >= duration * 0.6) {
    return { status: "failed", progress: 0.6, error: "The model couldn't finish this one. Try again.", results: [] };
  }

  const pool = mediaPool(job.mode);
  const results = Array.from({ length: job.count }, (_, index) => {
    const readyAt = duration * (0.7 + (0.3 * (index + 1)) / job.count);
    if (elapsed < readyAt) return null;
    const media = pool[(seed + index) % pool.length];
    return {
      ...media,
      id: `${jobId.slice(-10)}-${index}`,
      prompt: job.prompt,
      model: job.model,
      aspectRatio: job.aspectRatio,
      createdAt: new Date(job.startedAt + readyAt).toISOString(),
    };
  }).filter(Boolean);

  const done = results.length === job.count;
  return {
    status: done ? "done" : "running",
    progress: Math.min(1, elapsed / duration),
    results,
  };
}
