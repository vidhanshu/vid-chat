"use client";

import DeleteMessageModal from "@/src/common/components/modals/delete-message-modal";
import EditMessageModal from "@/src/common/components/modals/edit-message-modal";

import useMounted from "@/src/common/hooks/use-mounted";

const ModelsProvider = () => {
  const { isMounted } = useMounted();
  if (!isMounted) return null;

  return (
    <>
      <DeleteMessageModal />
      <EditMessageModal/>
    </>
  );
};

export default ModelsProvider;
