"use client";

import { ChangeEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUploadInput from "@/src/common/components/FileUploadInput";

import useChat from "@/src/home/context/chat/use-chat";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/src/common/hooks/use-modal";
import useAuth from "@/src/auth/context/use-auth";
import useSocket from "@/src/home/context/socket/use-socket";

import { UploadFileService } from "@/src/common/service/upload-file.service";

import { sendMessageHandler } from "@/src/home/utils/send-message-handler";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "application/pdf",
];

type TUploadLodingState = {
  type: "UPLOAD" | "SEND";
  isLoding: boolean;
};

const uploadFileService = new UploadFileService();
const SendFileModal = () => {
  const [fileUrl, setFilUrl] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<TUploadLodingState>({
    type: "UPLOAD",
    isLoding: false,
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const { socket } = useSocket();
  const { isOpen, onClose, type } = useModal();
  const { activeChat, setMessages } = useChat();

  const isModalOpen = isOpen && type === "SEND_FILE";

  const onSubmit = async () => {
    if (!file)
      return toast({
        title: "Please select a file",
      });
    if (file.size > MAX_FILE_SIZE) {
      return toast({
        title: "File size should be <= 3MB",
      });
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return toast({
        title: "File type not supported",
      });
    }

    try {
      setLoading({
        type: "UPLOAD",
        isLoding: true,
      });
      const res = await uploadFileService.uploadFile(file);
      if (res?.error || !res?.link) throw new Error("Something went wrong");

      setFilUrl(res.link);
      setLoading((prev) => ({ ...prev, type: "SEND" }));

      console.log(res.link);

      await sendMessageHandler({
        receiver: activeChat?._id!,
        sender: user?._id!,
        setMessage,
        setMessages,
        fileUrl: res.link,
        message,
        socket: socket,
      });
    } catch (error) {
      console.log("[FILE_SEND_MESSAGE_ERROR]");
    } finally {
      setLoading((prev) => ({ ...prev, isLoding: false }));
      handleClose();
    }
  };

  const handleClose = () => {
    setFile(undefined);
    setFilUrl("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Send Attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Select a file to send
            {activeChat?.username ? ` to ${activeChat?.username}` : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          <div className="space-y-8 px-6">
            <div className="flex flex-col gap-y-4 items-center justify-center text-center">
              <FileUploadInput
                fileUrl={fileUrl}
                clearForm={() => setFile(undefined)}
                fileName={file?.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) {
                    return;
                  }
                  const selectedFile = e.target.files[0];

                  setFile(selectedFile);
                }}
              />
              <Input
                placeholder="Type message if any"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                onClick={onSubmit}
                isLoading={loading.isLoding}
                type="submit"
                className="w-full"
              >
                {!loading.isLoding
                  ? "Send"
                  : loading.type === "UPLOAD"
                  ? "Uploading..."
                  : "Sending..."}
              </Button>
            </div>
          </div>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button
              isLoading={loading.isLoding}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendFileModal;
