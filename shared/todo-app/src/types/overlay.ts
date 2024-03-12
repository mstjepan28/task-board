import type { MutableRefObject } from "react";

type TOverlayControls = {
  open: (arg?: unknown) => void;
  close: (arg?: unknown) => void;
};

export type TOverlayRef = MutableRefObject<TOverlayControls | null>;

export interface IOverlayElement {
  baseRef: TOverlayRef;
}
