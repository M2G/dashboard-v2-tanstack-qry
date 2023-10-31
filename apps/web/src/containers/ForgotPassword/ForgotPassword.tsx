import type { JSX } from 'react';
import { useCallback } from 'react';
import { INITIAL_VALUES } from './constants';
import useForgotPassword from './hooks';
import ForgotPasswordView from '@/components/ForgotPasswordForm';

function ForgotPassword(): JSX.Element {
  const { mutate } = useForgotPassword();
  const onSubmit = useCallback((e) => mutate({ ...e }), [mutate]);

  return (
    <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ForgotPassword;
