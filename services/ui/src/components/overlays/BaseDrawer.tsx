import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useOverlayControls } from "../../hooks/useOverlayControls";
import type { TOverlayControls } from "../../types/overlay";

interface IProps {
  onOpen?: (arg?: unknown) => void;
  onClose?: (arg?: unknown) => void;
  closeOnOutsideClick?: boolean;
  className?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export const BaseDrawer = forwardRef(function BaseDrawer(
  { onOpen, onClose, closeOnOutsideClick, children, defaultOpen, className }: IProps,
  ref,
) {
  const { isOpen, openOverlay, closeOverlay } = useOverlayControls({ defaultOpen, onOpen, onClose });
  useImperativeHandle(ref, (): TOverlayControls => {
    return {
      isOpen: isOpen,
      open: openOverlay,
      close: closeOverlay,
    };
  });

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (closeOnOutsideClick) {
      closeOverlay();
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
        className={twMerge(
          "flex w-full max-w-sm grow translate-x-full cursor-auto flex-col overflow-hidden bg-white transition-all duration-300 data-[open=true]:translate-x-0 sm:w-fit",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
});
