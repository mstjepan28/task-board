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

export type TDirection = (typeof Directions)[keyof typeof Directions];
