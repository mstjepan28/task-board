import { type ReactNode, type MouseEvent, forwardRef, useImperativeHandle, useState } from "react";

interface IProps {
  onOpen?: (arg?: unknown) => void;
  onClose?: (arg?: unknown) => void;
  closeOnOutsideClick?: boolean;
  className?: string;
  children?: ReactNode;
}

export const BaseDrawer = forwardRef(function BaseDrawer(
  { onOpen, onClose, closeOnOutsideClick, children }: IProps,
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);

  const open = (arg?: unknown) => {
    setIsOpen(true);

    if (onOpen && typeof onOpen === "function") {
      onOpen(arg);
    }
  };

  const close = (arg?: unknown) => {
    setIsOpen(false);

    if (onClose && typeof onClose === "function") {
      onClose(arg);
    }
  };

  useImperativeHandle(ref, () => ({ open, close }));

  const onBackdropClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.stopPropagation();
    if (closeOnOutsideClick) {
      close();
    }
  };

  const backdropCursor = closeOnOutsideClick ? "cursor-pointer" : "";

  return (
    <div
      data-open={isOpen}
      onClick={onBackdropClick}
      className={`
        fixed inset-0 z-30 flex justify-end transition-all duration-300 
        data-[open=false]:pointer-events-none data-[open=true]:pointer-events-auto 
        data-[open=true]:bg-black/40 ${backdropCursor}
      `}
    >
      <div
        data-open={isOpen}
        onClick={(e) => e.stopPropagation()}
        className="
          flex w-full max-w-sm grow translate-x-full cursor-auto
          flex-col overflow-hidden bg-white transition-all 
          duration-300 data-[open=true]:translate-x-0 sm:w-fit
        "
      >
        {children}
      </div>
    </div>
  );
});
