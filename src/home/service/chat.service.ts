import { API } from "@/src/common/utils/api";

export class ChatService {
  async getChats() {
    try {
      const {
        data: { message, data, error },
      } = await API.get("/chats", {
        headers: {
          cache: "no-store",
        },
      });

      if (error) {
        return { error, message };
      }
      return { data, error: null };
    } catch (error: any) {
      console.log(error);
      return {
        error: error?.response?.data?.error || "Something went wrong",
      };
    }
  }

  async sendMessage(messageToBeSent: string, receiverId?: string) {
    try {
      if (!receiverId || !messageToBeSent)
        return { error: "ReceiverId  is missing" };
      const {
        data: { message, data, error },
      } = await API.post(`/chats/message/${receiverId}`, {
        message: messageToBeSent,
      });
      if (error) {
        return { error, message };
      }
      return { data, error: null };
    } catch (error: any) {
      return {
        error: error?.response?.data?.error || "Something went wrong",
      };
    }
  }

  async getConversation(receiverId: string | null) {
    try {
      if (!receiverId) return { error: "ReceiverId is missing" };
      const {
        data: { message, data, error },
      } = await API.get(`/chats/conversation/${receiverId}`);
      if (error) {
        return { error, message };
      }
      return { data, error: null };
    } catch (error: any) {
      return {
        error: error?.response?.data?.error || "Something went wrong",
      };
    }
  }
}
