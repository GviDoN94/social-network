import { z } from 'zod';

import { validateResponse } from '@/api/validateResponse';

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

export const login = (username: string, password: string): Promise<void> => {
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
};

export const fetchMe = (): Promise<User> => {
  return fetch('/api/users/me')
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserScheme.parse(data));
};
