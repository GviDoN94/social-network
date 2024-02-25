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

export const registerUser = (
  username: string,
  password: string,
): Promise<void> => {
  return fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(() => undefined);
};

const validateResponse = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
};

export const login = (username: string, password: string): Promise<void> => {
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
};
