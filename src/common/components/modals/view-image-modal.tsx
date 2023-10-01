"use client";

import React from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useModal } from "@/src/common/hooks/use-modal";
import useChat from "@/src/home/context/chat/use-chat";
import { StringShortener } from "../../utils/string-manipulation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import downloadFile from "../../utils/download-file";

const ViewImageModal = () => {
  const { activeChat } = useChat();
  const {
    isOpen,
    onClose,
    type,
    data: { message },
  } = useModal();

  const isModalOpen = isOpen && type === "VIEW_IMAGE";
  const fileName = message?.fileUrl?.split("/").pop();

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center font-bold">
            {StringShortener(fileName || "", 40)}
          </DialogTitle>
          <DialogDescription className="p-4">
            {message?.fileUrl ? (
              <>
                <div className="w-full h-[calc(100vh_-_300px)] relative border rounded-md">
                  <Image
                    src={message.fileUrl}
                    fill
                    alt="preview"
                    className="object-contain"
                  />
                </div>
                <Button
                  onClick={() => downloadFile(message?.fileUrl!, fileName)}
                  className="mt-2"
                >
                  <span className="flex items-center gap-x-2">
                    Download <Download className="w-4 h-4 text-white" />
                  </span>
                </Button>
              </>
            ) : (
              "File has been deleted"
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewImageModal;
