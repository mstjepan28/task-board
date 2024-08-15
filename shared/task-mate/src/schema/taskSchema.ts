import dayjs from "dayjs";
import { z } from "zod";
import { CompletionStatus } from "../enums/completionStatus";
import { RepeatCycle } from "../enums/repeatCycle";

const dateToString = (date: Date) => dayjs(date).toISOString();

export const taskSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),

  assigned_by: z.string().uuid(),
  assigned_to: z.array(z.string().uuid()),

  points: z.number().min(0),
  repeatCycle: z.nativeEnum(RepeatCycle),
  status: z.nativeEnum(CompletionStatus),
  color: z.string().regex(/^rgba\(\d{1,3},\d{1,3},\d{1,3},(0(\.\d{1,2})?|1(\.0{1,2})?)\)$/),

  deadline: z.coerce.date().transform(dateToString),
  postponed: z.coerce.date().transform(dateToString),

  created_at: z.coerce.date().transform(dateToString),
  updated_at: z.coerce.date().transform(dateToString),
});

export const taskListSchema = z.array(taskSchema);

export type TTask = z.infer<typeof taskSchema>;
