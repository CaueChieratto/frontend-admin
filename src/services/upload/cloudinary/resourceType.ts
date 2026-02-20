import type { CloudinaryResourceType } from "./types";

export function getResourceTypeFromFile(file: File): CloudinaryResourceType {
  if (file.type === "application/pdf") return "raw";
  return "auto";
}

export function isPdf(file: File): boolean {
  return file.type === "application/pdf";
}
