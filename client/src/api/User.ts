import { z } from 'zod';

export const UserScheme = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserScheme>;
