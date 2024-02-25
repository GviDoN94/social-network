import { FC, FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { registerUser } from '@/api/User';
import { queryClient } from '@/api/queryClient';
import { FormField } from '@/components/FormField';
import { Button } from '@/components/Button';

import './RegistrationForm.css';

export const RegistrationForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registrationMutation = useMutation(
    {
      mutationFn: () => registerUser(username, password),
    },
    queryClient,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    registrationMutation.mutate();
  };

  return (
    <form
      className="registration-form"
      onSubmit={handleSubmit}
    >
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {registrationMutation.error && (
        <span>{registrationMutation.error.message}</span>
      )}

      <Button
        type="submit"
        title="Зарегистрироваться"
        isLoading={registrationMutation.isPending}
      />
    </form>
  );
};
