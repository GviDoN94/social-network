import { z } from 'zod';

export const UserScheme = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserScheme>;

export const fetchUser = async (id: string): Promise<User> => {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserScheme.parse(data));
};
