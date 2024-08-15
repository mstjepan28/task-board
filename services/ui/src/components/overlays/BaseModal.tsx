import { DisplaySize, useResponsive } from "@services/utils";
import { forwardRef, useImperativeHandle, useMemo, useRef, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useOverlayControls } from "../../hooks/useOverlayControls";
import type { TOverlayControls } from "../../types/OverlayElement";

interface IBaseProps {
  children?: ReactNode;
  classNameBody?: string;
  disableClosing?: boolean;
  classNameBackdrop?: string;
  closeOnOutsideClick?: boolean;
}

interface IProps extends IBaseProps {
  defaultOpen?: boolean;
  onOpen?: (arg?: unknown) => void;
  onClose?: (arg?: unknown) => void;
  forceState?: "floating" | "popup" | undefined;
}

interface IModalProps extends IBaseProps {
  isOpen: boolean;
  close: () => void;
}

const ModalFloatingBody = ({
  close,
  isOpen,
  classNameBody,
  classNameBackdrop,
  children,
  closeOnOutsideClick,
  disableClosing,
}: IModalProps) => {
  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (closeOnOutsideClick && !disableClosing) {
      close();
    }
  };

  const customStyles = `${isOpen ? "flex" : "hidden"} ${closeOnOutsideClick ? "cursor-pointer" : ""}`;

  return (
    <div
      data-open={!!isOpen}
      data-clickable={closeOnOutsideClick}
      onClick={onBackdropClick}
      className={twMerge(
        `fixed inset-0 items-center justify-center z-50 bg-black/40 ${customStyles}`,
        classNameBackdrop,
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge("mx-4 w-full max-w-xs cursor-auto rounded-lg bg-white p-4 md:mx-0", classNameBody)}
      >
        {children}
      </div>
    </div>
  );
};

const ModalPopupBody = ({
  isOpen,
  close,
  classNameBody,
  classNameBackdrop,
  children,
  closeOnOutsideClick,
  disableClosing,
}: IModalProps) => {
  const THRESHOLD = 50;

  const startingPoint = useRef<number | null>(null);
  const popupBodyRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const calcDragDiff = (yPos: number) => {
    return Math.max(yPos - (startingPoint.current ?? 0), 0);
  };

  const onDragStart = (yPos: number) => {
    startingPoint.current = yPos;
    document.body.style.overscrollBehaviorY = "contain";

    if (popupBodyRef.current) {
      popupBodyRef.current.style.transitionDuration = "0ms";
    }
  };

  const onDragEnd = (yPos: number) => {
    document.body.style.overscrollBehaviorY = "";

    if (popupBodyRef.current) {
      popupBodyRef.current.style.transitionDuration = "";
      popupBodyRef.current.style.transform = "";
    }

    if (calcDragDiff(yPos) < THRESHOLD) {
      return;
    }

    startingPoint.current = null;

    if (modalRef.current) {
      modalRef.current.dataset.open = "false";
    }
    if (popupBodyRef.current) {
      popupBodyRef.current.dataset.open = "false";
    }

    close();
  };

  const onDragMove = (yPos: number) => {
    if (!popupBodyRef.current) {
      return;
    }

    const diff = calcDragDiff(yPos);
    if (diff > 0) {
      popupBodyRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (closeOnOutsideClick && !disableClosing) {
      close();
    }
  };

  const customStyles = `${isOpen ? "pointer-events-auto bg-black/40" : "pointer-events-none"} ${
    closeOnOutsideClick ? "cursor-pointer" : ""
  }`;

  return (
    <div
      data-open={!!isOpen}
      ref={modalRef}
      onClick={onBackdropClick}
      className={twMerge(
        `fixed inset-0 flex items-end z-50 transition-all duration-300 overscroll-y-contain ${customStyles}`,
        classNameBackdrop,
      )}
    >
      <div
        ref={popupBodyRef}
        data-open={!!isOpen}
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          "w-full fixed rounded-t-lg bg-white data-[open=true]:translate-y-0 translate-y-full transition-all !max-w-full",
          classNameBody,
        )}
      >
        {/* Handle bar for closing the modal */}
        <div className="relative flex justify-center py-2 rounded-t-lg bg-gray-100/50">
          {/* Touch area */}
          <div
            className="absolute w-full h-[150%] bottom-0"
            onTouchStart={(event) => !disableClosing && onDragStart(event.changedTouches[0].clientY)}
            onTouchMove={(event) => !disableClosing && onDragMove(event.changedTouches[0].clientY)}
            onTouchEnd={(event) => !disableClosing && onDragEnd(event.changedTouches[0].clientY)}
          />

          {/* Indicator */}
          <div className="w-[50px] h-1 bg-gray-400 rounded-full" />
        </div>

        <div className="p-4 pt-0 basis-full">{children}</div>
      </div>
    </div>
  );
};

export const BaseModal = forwardRef(function BaseModal(
  {
    onOpen,
    onClose,
    classNameBody,
    classNameBackdrop,
    children,
    defaultOpen,
    forceState,
    disableClosing,
    closeOnOutsideClick,
  }: IProps,
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

  const screenSize = useResponsive();

  const Modal = useMemo(() => {
    if (forceState === "floating") {
      return ModalFloatingBody;
    }

    if (forceState === "popup") {
      return ModalPopupBody;
    }

    return screenSize > DisplaySize.MOBILE ? ModalFloatingBody : ModalPopupBody;
  }, [screenSize, forceState]);

  return (
    <Modal
      isOpen={isOpen}
      close={closeOverlay}
      classNameBody={classNameBody}
      disableClosing={disableClosing}
      classNameBackdrop={classNameBackdrop}
      closeOnOutsideClick={closeOnOutsideClick}
    >
      {children}
    </Modal>
  );
});
