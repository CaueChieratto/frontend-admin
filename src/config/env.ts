function getEnvVariable(key: string): string {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Variável de ambiente ${key} não definida.`);
  }

  return value;
}

export const ENV = {
  CLOUDINARY_CLOUD_NAME: getEnvVariable("VITE_CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_UPLOAD_PRESET: getEnvVariable("VITE_CLOUDINARY_UPLOAD_PRESET"),
};
