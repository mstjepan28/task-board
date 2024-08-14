import type { TypeFromEnum } from "@services/utils";

export const Directions = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
  TOP_RIGHT: "top_right",
  TOP_LEFT: "top_left",
  BOTTOM_RIGHT: "bottom_right",
  BOTTOM_LEFT: "bottom_left",
};

export type TDirection = TypeFromEnum<typeof Directions>;
