import { connection } from "next/server";
import { decodeJob, jobSnapshot } from "@/lib/jobs";
import { errorResponse } from "@/lib/server/http";

export async function GET(request, { params }) {
  await connection();
  const { jobId } = await params;
  const job = decodeJob(jobId);
  if (!job) return errorResponse("Job not found", 404);
  return Response.json(jobSnapshot(jobId, job, Date.now()));
}
