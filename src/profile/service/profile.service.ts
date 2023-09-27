import { toast } from "@/components/ui/use-toast";
import { API, handleApiError } from "@/src/common/utils/api";

export class ProfileService {
  async updateProfile({
    username,
    password,
    email,
  }: {
    username?: string;
    password?: string;
    email?: string;
  }) {
    try {
      if (!username && !password && !email) {
        toast({
          title: "Info",
          description: "Nothing to update",
        });
        return { error: "Nothing to update" };
      }
      const { data } = await API.patch("/users/update", {
        username,
        password,
        email,
      });
      const { message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      return { error: null, data: data.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
}
