import { API, handleApiError } from "@/src/common/utils/api";
import { toast } from "@/components/ui/use-toast";

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
      return handleApiError(error);
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
      return handleApiError(error);
    }
  }

  async deleteMessage(messageId: string) {
    try {
      if (!messageId) return { error: "messageId is required" };
      const { data } = await API.delete(`/chats/message/${messageId}`);
      const { message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      return { error: null };
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateMessage(messageId: string, newMessage: string) {
    try {
      if (!messageId || !newMessage)
        return { error: "messageId and message is required" };
      const { data } = await API.patch(`/chats/message/${messageId}`, {
        message: newMessage,
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
      return handleApiError(error);
    }
  }
}
