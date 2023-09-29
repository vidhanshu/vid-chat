import { API, handleApiError } from "../utils/api";
import { toast } from "@/components/ui/use-toast";

export class UploadFileService {
  async uploadFile(file: File) {
    try {
      if (!file) return { error: "File not found" };
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await API.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { message, link } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      return { link, error: null };
    } catch (error) {
      handleApiError(error);
    }
  }

  async deleteFile(link: string) {
    try {
      const key = link.split("/").pop();
      if (!key) return { error: "Key not found" };
      const { data } = await API.delete("/file/delete", {
        data: { key },
      });
      const { message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      return { error: null };
    } catch (error) {
      handleApiError(error);
    }
  }
}
