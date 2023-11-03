import type { JSX } from 'react';
import { useCallback } from 'react';
import SignupForm from '@/components/SignupForm';
import { INITIAL_VALUES } from './constants';
import useSignup from './hooks';

function Signup(): JSX.Element {
  const { mutate } = useSignup();

  const onSubmit = useCallback(
    (e: { email: string; password: string }): void => {
      mutate({ ...e });
    },
    [mutate],
  );

  return <SignupForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signup;
