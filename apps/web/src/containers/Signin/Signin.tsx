import type { JSX } from 'react';
import { useCallback, useContext } from 'react';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import { AuthContext } from '@/AuthContext';
import useSignin from './hooks';

function Signin(): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  const mutation = useSignin();

  const onSubmit = useCallback(
    (e: { email: string; password: string }): void => {
      mutation.mutate({ ...e });
    },
    [mutation],
  );

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
