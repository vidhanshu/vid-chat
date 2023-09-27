import { API } from "@/src/common/utils/api";

export class UserService {
  async searchUser(key: string): Promise<{ data?: any; error?: any }> {
    try {
      if (!key) return { data: [], error: null };
      const {
        data: { data, error },
      } = await API.get(`/users/?key=${key}`);
      if (error) return { data: [], error: true };
      return { error: null, data };
    } catch (error: any) {
      return { error: error.message, data: null };
    }
  }
}
