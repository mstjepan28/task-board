import dayjs from "dayjs";
import { z } from "zod";

const dateToString = (date: Date) => dayjs(date).toISOString();

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  totalPoints: z.number().min(0).max(Number.MAX_SAFE_INTEGER),
  profilePictureUrl: z.string().or(z.null()),
  friends: z.array(z.string()),
  updatedAt: z.coerce.date().transform(dateToString),
});

export type TUser = z.infer<typeof userSchema>;
