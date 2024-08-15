import dayjs from "dayjs";
import { z } from "zod";
import { CompletionStatus } from "../enums/completionStatus";
import { RepeatCycle } from "../enums/repeatCycle";

const dateToString = (date: Date) => dayjs(date).toISOString();
const hexCodePattern = /^#[0-9A-Fa-f]{6}\|#[0-9A-Fa-f]{6}\|#[0-9A-Fa-f]{6}$/;

export const taskSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),

  assigned_by: z.string().uuid(),
  assigned_to: z.array(z.string().uuid()),

  points: z.number().min(0),
  repeatCycle: z.nativeEnum(RepeatCycle),
  status: z.nativeEnum(CompletionStatus),
  color: z.string().regex(hexCodePattern),

  deadline: z.coerce.date().transform(dateToString),
  postponed: z.coerce.date().transform(dateToString),

  created_at: z.coerce.date().transform(dateToString),
  updated_at: z.coerce.date().transform(dateToString),
});

export const taskListSchema = z.array(taskSchema);

export type TTask = z.infer<typeof taskSchema>;
