import { API, handleApiError } from "@/src/common/utils/api";
import { toast } from "@/components/ui/use-toast";

class ChatService {
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

  async sendMessage(
    {
      messageToBeSent,
      fileUrl,
    }: {
      messageToBeSent?: string;
      fileUrl?: string;
    },
    receiverId?: string
  ) {
    try {
      if (!receiverId) return { error: "ReceiverId  is missing" };
      if (!messageToBeSent && !fileUrl) {
        return { error: "Message or file is required" };
      }
      const {
        data: { message, data, error },
      } = await API.post(`/chats/message/${receiverId}`, {
        message: messageToBeSent,
        fileUrl,
      });
      if (error) {
        return { error, message };
      }
      return { data, error: null };
    } catch (error: any) {
      return handleApiError(error);
    }
  }

  async deleteMessage(messageId: string, fileUrl?: string) {
    try {
      if (!messageId) return { error: "messageId is required" };
      const { data } = await API.delete(`/chats/message/${messageId}`, {
        data: {
          deleteFile: !!fileUrl,
        },
      });
      const { message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      if (fileUrl) {
        const key = fileUrl.split("/").pop();
        await API.delete(`/file/delete`, {
          data: {
            key,
          },
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

export default new ChatService();