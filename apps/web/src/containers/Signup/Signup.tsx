import type { JSX } from 'react';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import SignupForm from '@/components/SignupForm';
import { INITIAL_VALUES } from './constants';
import { queryClient } from '@/App';
import api from '@/api';
import useSignup from './hooks';

function Signup(): JSX.Element {
  const mutation = useSignup();

  const onSubmit = useCallback(
    (e: { email: string; password: string }) => {
      mutation.mutate({ ...e });
    },
    [mutation],
  );

  return <SignupForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signup;
