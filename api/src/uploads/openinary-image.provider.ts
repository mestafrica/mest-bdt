import { Injectable, BadRequestException } from '@nestjs/common';
import { ImageProvider, ImageUploadResponse } from './image-provider.interface';

interface OpeninaryFileResponse {
  url: string;
}

interface OpeninaryResponse {
  success: boolean;
  files: OpeninaryFileResponse[];
}

@Injectable()
export class OpeninaryImageProvider implements ImageProvider {
  private readonly apiUrl: string;
  private readonly publicUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.OPENINARY_URL || 'http://openinary:3000';
    this.publicUrl =
      process.env.OPENINARY_PUBLIC_URL || 'http://localhost:3002';
    this.apiKey = process.env.OPENINARY_API_KEY || '';
  }

  async uploadImage(file: Express.Multer.File): Promise<ImageUploadResponse> {
    const formData = new FormData();
    const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
    formData.append('files', blob, file.originalname);

    try {
      const response = await fetch(`${this.apiUrl}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Openinary upload failed: ${errorText}`);
      }

      const result = (await response.json()) as OpeninaryResponse;
      if (result.success && result.files && result.files.length > 0) {
        // Openinary returns internal URLs in result.files[0].url
        // We might need to replace the internal base URL with the public one
        let url = result.files[0].url;
        if (this.publicUrl && this.apiUrl) {
          url = url.replace(this.apiUrl, this.publicUrl);
          // Also handle cases where Openinary returns localhost:3000 but we want localhost:3002
          url = url.replace('http://localhost:3000', this.publicUrl);
        }
        return { url };
      }

      throw new Error(
        'Openinary upload failed: No file information in response',
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
