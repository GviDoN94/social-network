import { FC, useState } from 'react';

import { LoginForm } from '@/components/LoginForm';
import { RegistrationForm } from '@/components/RegistrationForm';
import {
  SegmentedSwitch,
  SegmentedSwitchOption,
} from '@/components/SegmentedSwitch';

import './AuthForm.css';

type AuthType = 'login' | 'registration';

export const AuthForm: FC = () => {
  const [authType, setAuthType] = useState<AuthType>('login');

  return (
    <div className="auth-form">
      <SegmentedSwitch>
        <SegmentedSwitchOption
          title="Войти"
          isActive={authType === 'login'}
          onClick={() => setAuthType('login')}
        />
        <SegmentedSwitchOption
          title="Зарегистрироваться"
          isActive={authType === 'registration'}
          onClick={() => setAuthType('registration')}
        />
      </SegmentedSwitch>

      {authType == 'login' ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};
