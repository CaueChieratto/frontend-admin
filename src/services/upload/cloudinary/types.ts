export type CloudinaryResourceType = "image" | "video" | "raw" | "auto";

export type CloudinaryUploadResponse = {
  secure_url: string;
  resource_type?: CloudinaryResourceType;
  error?: {
    message?: string;
  };
};
