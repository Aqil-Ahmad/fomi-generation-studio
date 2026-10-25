function withFailure(path, failKey) {
  const requested = new URLSearchParams(window.location.search).get("fail");
  return requested === failKey ? `${path}?fail=1` : path;
}

async function request(path, { method = "POST", body, failKey } = {}) {
  const response = await fetch(failKey ? withFailure(path, failKey) : path, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? "Something went wrong. Try again.");
  return data;
}

export const api = {
  generate: (settings) => request("/api/generate", { body: settings, failKey: "generate" }),
  getJob: (jobId) => request(`/api/jobs/${jobId}`, { method: "GET" }),
};
