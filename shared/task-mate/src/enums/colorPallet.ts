export const ColorPallet = {
  BLUE: "#74BCFD|#254C7E|#FFFFFF",
  RED: "#DC3545|#A71D2A|#FFFFFF",
  GREEN: "#28A745|#19692C|#FFFFFF",
  ORANGE: "#FF5733|#C70039|#FFFFFF",
  PINK: "#E83E8C|#A0275D|#FFFFFF",
  PURPLE: "#6610F2|#3E0A8A|#FFFFFF",
} as const;

export type TColorPallet = (typeof ColorPallet)[keyof typeof ColorPallet];
