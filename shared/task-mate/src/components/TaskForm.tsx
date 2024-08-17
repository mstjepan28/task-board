import type { IFormProps } from "@services/utils";
import type { TTask } from "../schema/taskSchema";

// ------------------------------------------------
//  FIELD NAME     |  FIELD TYPE
// ------------------------------------------------
// "description":  |  "string",
// "assigned-by":  |  "uuid",
// "assigned-to":  |  "uuid[]",
// color:          |  "rgba",
// repeatCycle:    |  "never|daily|weekly|monthly",
// deadline:       |  "iso-datetime",
// postponed:      |  "iso-datetime",
// status:         |  "pending|inProgress|closed|done",
// points:         |  "float",
// ------------------------------------------------

const _ColorPalettes = {
  BLUE: "#74BCFD|#254C7E|#FFFFFF",
  RED: "#DC3545|#A71D2A|#FFFFFF",
  GREEN: "#28A745|#19692C|#FFFFFF",
  ORANGE: "#FF5733|#C70039|#FFFFFF",
  PINK: "#E83E8C|#A0275D|#FFFFFF",
  PURPLE: "#6610F2|#3E0A8A|#FFFFFF",
} as const;

export const TaskForm = ({ data, onSubmit, isSubmitting, onDelete, isDeleting }: IFormProps<TTask>) => {
  return <div></div>;
};
