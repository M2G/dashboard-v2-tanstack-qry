import type { JSX } from 'react';
import { useCallback, useContext } from 'react';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import useSignin from './hooks';
import { AuthContext } from '@/AuthContext';

function Signin(): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
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
