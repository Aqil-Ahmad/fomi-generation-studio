import { encodeJob, validateRequest } from "@/lib/jobs";
import { PROMPT_LIMIT } from "@/lib/options";
import { errorResponse, readJson, wait } from "@/lib/server/http";

export async function POST(request) {
  const body = await readJson(request);
  const job = {
    prompt: typeof body.prompt === "string" ? body.prompt.trim().slice(0, PROMPT_LIMIT) : "",
    mode: body.mode,
    count: body.count,
    aspectRatio: body.aspectRatio,
    model: body.model,
  };

  const problem = validateRequest(job);
  if (problem) return errorResponse(problem, 400);

  await wait([300, 700]);
  const fail = new URL(request.url).searchParams.has("fail");
  return Response.json({ jobId: encodeJob({ ...job, fail, startedAt: Date.now() }) }, { status: 202 });
}
