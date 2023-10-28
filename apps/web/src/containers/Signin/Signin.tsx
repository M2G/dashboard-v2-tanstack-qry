import type { JSX } from 'react';
import { useCallback, useContext, useEffect } from 'react';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import { AuthContext } from '@/AuthContext';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/App';
import api from '@/api';

interface ISignin {
  loading: boolean;
  signin: any;
}

function Signin({ loading, signin }: ISignin): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  const postTodo = (values: any) => api.post('/auth/authenticate', values);

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: ({ data: { data } }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      console.log('-----------------------', data);
      data?.token && activateAuth(data.token);
    },
  });

  const onSubmit = useCallback(
    (e: { email: string; password: string }) => {
      console.log('mutate mutate mutate');
      mutation.mutate({ ...e });
    },
    [mutation],
  );

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
