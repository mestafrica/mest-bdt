export interface ImageUploadResponse {
  url: string;
}

export interface ImageProvider {
  uploadImage(file: Express.Multer.File): Promise<ImageUploadResponse>;
}
