import type { JSX } from 'react';
import { useCallback } from 'react';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import useSignin from './hooks';

function Signin(): JSX.Element {
  const { data, mutate } = useSignin();

  const onSubmit = useCallback(
    (e: { email: string; password: string }): void => {
      mutate({ ...e });
    },
    [mutate],
  );

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
