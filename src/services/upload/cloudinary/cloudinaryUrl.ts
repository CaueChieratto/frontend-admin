import type { CloudinaryResourceType } from "./types";

type BuildUploadUrlParams = {
  cloudName: string;
  resourceType: CloudinaryResourceType;
};

export function buildCloudinaryUploadUrl({
  cloudName,
  resourceType,
}: BuildUploadUrlParams): string {
  return `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
}
