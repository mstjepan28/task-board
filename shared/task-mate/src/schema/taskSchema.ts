import dayjs from "dayjs";
import { z } from "zod";
import { CompletionStatus } from "../enums/completionStatus";
import { RepeatCycle } from "../enums/repeatCycle";
import { ColorPallet } from "../enums/colorPallet";

const dateToString = (date: Date) => dayjs(date).toISOString();

const userSchema = z.object({
  id: z.string(),
  name: z.string().max(255),
});

const baseTaskSchema = {
  description: z.string(),

  assigned_by: userSchema,
  assigned_to: z.array(userSchema),

  points: z.number().min(0),
  repeatCycle: z.nativeEnum(RepeatCycle),
  status: z.nativeEnum(CompletionStatus),
  color: z.nativeEnum(ColorPallet),

  deadline: z.coerce.date().transform(dateToString),

  created_at: z.coerce.date().transform(dateToString),
  updated_at: z.coerce.date().transform(dateToString),
};

export const newTaskSchema = z.object(baseTaskSchema);

export const taskSchema = z.object({
  ...baseTaskSchema,

  id: z.string(),
  postponed: z.coerce.date().transform(dateToString).optional(),
});

export type TTask = z.infer<typeof taskSchema>;
