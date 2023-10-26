import ForgotPasswordView from '@/components/ForgotPasswordForm';
import { authForgotPasswordAction } from '@/store/auth/actions';
import type { JSX } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { INITIAL_VALUES } from './constants';

function ForgotPassword(): JSX.Element {
  const dispatch = useDispatch();
  const onSubmit = useCallback((e: any) => dispatch(authForgotPasswordAction(e)), [dispatch]);

  return <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default ForgotPassword;
