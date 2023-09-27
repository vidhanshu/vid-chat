import { API, handleApiError } from "../utils/api";
import { toast } from "@/components/ui/use-toast";

export class UploadFileService {
  async uploadImage(image: File) {
    try {
      if (!image) return { error: "File not found" };
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await API.post("/image/upload", formData, {
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

  async deleteImage(link: string) {
    try {
      const key = link.split("/").pop();
      if (!key) return { error: "Key not found" };
      const { data } = await API.delete("/image/delete", {
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
