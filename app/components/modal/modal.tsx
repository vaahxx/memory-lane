"use client";

import React, { useId, useRef } from "react";
import { Button, type ButtonProps } from "../button/button";

type ModalProps = {
  children: JSX.Element;
  triggerButtonProps?: ButtonProps;
  open: boolean;
  onModalStateChange: (open: boolean) => void;
};

export function Modal({
  children,
  triggerButtonProps,
  open,
  onModalStateChange,
}: ModalProps) {
  const id = useId();
  const childrenRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const isChildElement =
      event.target instanceof Node &&
      childrenRef.current?.contains(event.target as Node);

    if (!isChildElement) {
      onModalStateChange(false);
    }
  };

  return (
    <>
      <Button
        type='button'
        onClick={() => {
          onModalStateChange(!open);
        }}
        {...triggerButtonProps}
      />

      {open && (
        <div
          id={id}
          onClick={handleOutsideClick}
          className='flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50'
        >
          <div className='bg-white p-10 rounded-md w-3/4' ref={childrenRef}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
