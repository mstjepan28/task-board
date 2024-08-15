import type { MutableRefObject } from "react";
import type { useOverlayControls } from "../hooks/useOverlayControls";

export type TOverlayToggleOptions = {
  toggleSameState?: boolean;
};

export type TOverlayControls = {
  open: ReturnType<typeof useOverlayControls>["openOverlay"];
  close: ReturnType<typeof useOverlayControls>["closeOverlay"];
  isOpen: ReturnType<typeof useOverlayControls>["isOpen"];
};

export type TOverlayRef = MutableRefObject<TOverlayControls | null>;

export interface IOverlayElement {
  baseRef: TOverlayRef;
}
