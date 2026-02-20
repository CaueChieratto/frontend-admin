import { request } from "@/services/http/request";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type HttpOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
};

const jsonHeaders = { "Content-Type": "application/json" };

export const httpClient = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body?: unknown, options?: Omit<HttpOptions, "body">) =>
    request<T>(url, {
      method: "POST",
      headers: { ...jsonHeaders, ...(options?.headers ?? {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T>(
    url: string,
    body?: unknown,
    options?: Omit<HttpOptions, "body">,
  ) =>
    request<T>(url, {
      method: "PATCH",
      headers:
        body !== undefined
          ? { ...jsonHeaders, ...(options?.headers ?? {}) }
          : options?.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T>(url: string, body?: unknown, options?: Omit<HttpOptions, "body">) =>
    request<T>(url, {
      method: "PUT",
      headers:
        body !== undefined
          ? { ...jsonHeaders, ...(options?.headers ?? {}) }
          : options?.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T>(
    url: string,
    body?: unknown,
    options?: Omit<HttpOptions, "body">,
  ) =>
    request<T>(url, {
      method: "DELETE",
      headers:
        body !== undefined
          ? { ...jsonHeaders, ...(options?.headers ?? {}) }
          : options?.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),
};
