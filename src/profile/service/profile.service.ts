import { toast } from "@/components/ui/use-toast";
import { API, handleApiError } from "@/src/common/utils/api";

class ProfileService {
  async updateProfile({
    username,
    password,
    email,
    avatar,
  }: {
    username?: string;
    password?: string;
    email?: string;
    avatar?: string;
  }) {
    try {
      if (!username && !password && !email && !avatar) {
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
        avatar,
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

export default new ProfileService();