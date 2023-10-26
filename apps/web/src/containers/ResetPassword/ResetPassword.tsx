import type { JSX } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { authRecoverPasswordAction } from '@/store/auth/actions';
import ResetPasswordView from '@/components/ResetPasswordForm';
import { INITIAL_VALUES } from './constants';

function ResetPassword(): JSX.Element {
  const { search } = useLocation();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      const searchParams = new URLSearchParams(search);
      if (searchParams.has('token')) {
        const token = searchParams.get('token');
        dispatch(authRecoverPasswordAction({ ...e, token }));
      }
    },
    [dispatch, search],
  );

  return <ResetPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default ResetPassword;
