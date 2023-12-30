import type { JSX } from 'react';
import { useCallback } from 'react';
import { useAuth } from '@/AuthContext';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import useSignin from './hooks';

function Signin(): JSX.Element {
  const { activateAuth } = useAuth();
  const { mutateAsync } = useSignin();

  const onSubmit = useCallback(
    async (e: { email: string; password: string }): Promise<void> => {
      const data = await mutateAsync({ ...e });
      activateAuth(data?.data?.data?.token);
    },
    [activateAuth, mutateAsync],
  );

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
