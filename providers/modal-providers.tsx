"use client";

import { useEffect, useState } from "react";

import { AddAssistantModal } from "@/components/modals/add-assistant-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddAssistantModal />
    </>
  );
};
