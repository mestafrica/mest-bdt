import { useState } from "react";
import { apiClient } from "@/utils/api";

export const useUpload = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiClient.post<{ url: string }>(
        "/uploads/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUrl(response.data.url);
      return response.data.url;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload file";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { upload, url, loading, error };
};
