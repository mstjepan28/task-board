import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  profilePicture: z.string().or(z.null()),
});

export type TUser = z.infer<typeof userSchema>;
