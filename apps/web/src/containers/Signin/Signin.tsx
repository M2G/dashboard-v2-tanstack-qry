import type { JSX } from 'react';
import { useCallback, useContext } from 'react';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import { AuthContext } from '@/AuthContext';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { queryClient } from '@/App';
import api from '@/api';

function Signin(): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  const authenticate = (values: { email: string; password: string }) =>
    api.post('/auth/authenticate', values);

  const mutation: UseMutationResult<AxiosResponse<any, any>> = useMutation({
    mutationFn: authenticate,
    onSuccess: ({ data: { data } }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['authenticate'] });
      data?.token && activateAuth(data.token);
    },
  });

  const onSubmit = useCallback(
    (e: { email: string; password: string }): void => {
      mutation.mutate({ ...e });
    },
    [mutation],
  );

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
