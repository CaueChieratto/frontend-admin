export class UploadError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "UploadError";
    this.status = status;
  }
}
