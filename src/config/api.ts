function requireEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
}

export const API = {
  BASE_URL: requireEnv("VITE_API_BASE_URL"),
} as const;
