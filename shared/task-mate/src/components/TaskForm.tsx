import type { IFormProps } from "@services/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { ColorPallet, type TColorPallet } from "../enums/colorPallet";
import type { TTask } from "../schema/taskSchema";
import { ColorPicker } from "./ColorPicker";
import { TaskCard } from "./TaskCard";

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

// { data, onSubmit, isSubmitting, onDelete, isDeleting }

const MOCK_TASK: TTask = {
  id: "mock_id",
  description: "Task description",
  assigned_by: { id: "mock_id", name: "" },
  assigned_to: [{ id: "mock_id", name: "Me" }],
  color: ColorPallet.BLUE,
  repeatCycle: "never",
  deadline: dayjs().toISOString(),
  postponed: dayjs().toISOString(),
  status: "pending",
  points: 10.0,
  created_at: dayjs().toISOString(),
  updated_at: dayjs().toISOString(),
};

export const TaskForm = (_props: IFormProps<TTask>) => {
  const [color, setColor] = useState<TColorPallet>(ColorPallet.BLUE);

  return (
    <div className="p-4">
      <div className="pt-4 pb-8">
        <TaskCard task={{ ...MOCK_TASK, color }} />
      </div>

      <ColorPicker onChange={(scheme) => setColor(scheme)} />
    </div>
  );
};
