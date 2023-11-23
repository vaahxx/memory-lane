"use client";

import { useState } from "react";
import { NewMemoryForm } from "@/app/components/forms/new-memory-form";
import { Modal } from "@/app/components/modal";

interface NewMemoryFormModalProps {
  userId: number;
}

export function NewMemoryFormModal({ userId }: NewMemoryFormModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onModalStateChange={(open) => {
        setOpen(open);
      }}
      open={open}
      triggerButtonProps={{
        icon: "plus",
        children: "New Memory",
      }}
    >
      <NewMemoryForm
        userId={userId}
        onSubmit={async () => {
          setOpen(false);
        }}
      />
    </Modal>
  );
}
