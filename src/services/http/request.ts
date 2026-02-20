import { API } from "../../config/api";
import { HttpError } from "./errors";
import { parseJsonSafe, parseTextSafe, buildErrorMessage } from "./parse";

type RequestOptions = RequestInit & {};

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const url = new URL(endpoint, API.BASE_URL);

  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null as T;
  }

  const jsonPayload = await parseJsonSafe(response);

  if (!response.ok) {
    const textPayload = jsonPayload ? null : await parseTextSafe(response);
    const message = buildErrorMessage(
      response.status,
      jsonPayload,
      textPayload,
    );
    throw new HttpError(message, response.status, jsonPayload ?? textPayload);
  }

  if (jsonPayload === null) {
    return (await response.text()) as unknown as T;
  }

  return jsonPayload as T;
}
