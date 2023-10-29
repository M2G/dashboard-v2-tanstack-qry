import type { JSX } from 'react';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ResetPasswordView from '@/components/ResetPasswordForm';
import { INITIAL_VALUES } from './constants';
import useResetPassword from './hooks';

function ResetPassword(): JSX.Element {
  const { search } = useLocation();
  const mutation = useResetPassword();

  const onSubmit = useCallback(
    (e) => {
      const searchParams = new URLSearchParams(search);
      if (searchParams.has('token')) {
        const token = searchParams.get('token');
        mutation.mutate({ ...e, token });
      }
    },
    [mutation, search],
  );

  return (
    <ResetPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ResetPassword;
