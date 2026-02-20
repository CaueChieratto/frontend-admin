import { buildCloudinaryUploadUrl } from "./cloudinary/cloudinaryUrl";
import { uploadToCloudinary } from "./cloudinary/cloudinaryClient";
import { ensurePdfExtension } from "./cloudinary/normalizeUrl";
import { getResourceTypeFromFile, isPdf } from "./cloudinary/resourceType";
import { UploadError } from "./cloudinary/errors";
import { CLOUDINARY } from "../../config/cloudinary";

export const UploadService = {
  async upload(file: File): Promise<string> {
    if (!file) throw new UploadError("Nenhum arquivo foi enviado.");

    const resourceType = getResourceTypeFromFile(file);

    const url = buildCloudinaryUploadUrl({
      cloudName: CLOUDINARY.CLOUD_NAME,
      resourceType,
    });

    const data = await uploadToCloudinary({
      url,
      file,
      uploadPreset: CLOUDINARY.UPLOAD_PRESET,
    });

    if (!data?.secure_url) {
      throw new UploadError(
        "Resposta inválida do Cloudinary: secure_url ausente.",
      );
    }

    const finalUrl = isPdf(file)
      ? ensurePdfExtension(data.secure_url)
      : data.secure_url;
    return finalUrl;
  },
};
