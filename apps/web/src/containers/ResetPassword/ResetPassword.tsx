import type { JSX } from 'react';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ResetPasswordView from '@/components/ResetPasswordForm';
import { INITIAL_VALUES } from './constants';
import useResetPassword from './hooks';

function ResetPassword(): JSX.Element {
  const { search } = useLocation();
  const { mutate } = useResetPassword();

  const onSubmit = useCallback(
    (e) => {
      const searchParams = new URLSearchParams(search);
      if (searchParams.has('token')) {
        const token = searchParams.get('token');
        mutate({ ...e, token });
      }
    },
    [mutate, search],
  );

  return (
    <ResetPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ResetPassword;
