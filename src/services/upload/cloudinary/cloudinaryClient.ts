import type { CloudinaryUploadResponse } from "./types";
import { UploadError } from "./errors";

type UploadToCloudinaryParams = {
  url: string;
  file: File;
  uploadPreset: string;
};

export async function uploadToCloudinary({
  url,
  file,
  uploadPreset,
}: UploadToCloudinaryParams): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    const errorData: CloudinaryUploadResponse | null = await response
      .json()
      .catch(() => null);

    const message =
      errorData?.error?.message || response.statusText || "Upload failed";

    throw new UploadError(message, response.status);
  }

  return response.json() as Promise<CloudinaryUploadResponse>;
}
