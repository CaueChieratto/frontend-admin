export async function parseJsonSafe(
  response: Response,
): Promise<unknown | null> {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return response.json().catch(() => null);
}

export async function parseTextSafe(
  response: Response,
): Promise<string | null> {
  return response.text().catch(() => null);
}

export function buildErrorMessage(
  status: number,
  jsonPayload: unknown,
  textPayload: string | null,
): string {
  if (jsonPayload && typeof jsonPayload === "object") {
    const anyObj = jsonPayload as Record<string, unknown>;
    const msg =
      (typeof anyObj.message === "string" && anyObj.message) ||
      (typeof anyObj.erro === "string" && anyObj.erro) ||
      (typeof anyObj.error === "string" && anyObj.error);
    if (msg) return msg;
  }

  if (textPayload && textPayload.trim()) return textPayload.slice(0, 300);

  return `Erro: ${status}`;
}
