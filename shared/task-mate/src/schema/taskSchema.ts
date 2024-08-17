import dayjs from "dayjs";
import { z } from "zod";
import { CompletionStatus } from "../enums/completionStatus";
import { RepeatCycle } from "../enums/repeatCycle";
import { ColorPallet } from "../enums/colorPallet";

const dateToString = (date: Date) => dayjs(date).toISOString();

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
});

export const taskSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),

  assigned_by: userSchema,
  assigned_to: z.array(userSchema),

  points: z.number().min(0),
  repeatCycle: z.nativeEnum(RepeatCycle),
  status: z.nativeEnum(CompletionStatus),
  color: z.nativeEnum(ColorPallet),

  deadline: z.coerce.date().transform(dateToString),
  postponed: z.coerce.date().transform(dateToString).or(z.literal(null)),

  created_at: z.coerce.date().transform(dateToString),
  updated_at: z.coerce.date().transform(dateToString),
});

export const taskListSchema = z.array(taskSchema);

export type TTask = z.infer<typeof taskSchema>;
