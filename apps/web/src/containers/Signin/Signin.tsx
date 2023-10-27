import type { JSX } from 'react';
import { useCallback, useContext, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { signinUserAction } from '@/store/signin/actions';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import { AuthContext } from '@/AuthContext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import api from '@/api';

const queryClient = new QueryClient();

interface ISignin {
  loading: boolean;
  signin: any;
}

function Signin({ loading, signin }: ISignin): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  /*const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e: { email: string; password: string }) => dispatch(signinUserAction(e)),
    [dispatch],
  );

  useEffect(() => {
    signin?.token && activateAuth(signin.token);
  }, [activateAuth, signin?.token]);*/

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

const mapStateToProps = (state: { signin: { data: any; loading: any } }) => {
  return {
    loading: state.signin.loading,
    signin: state.signin.data,
  };
};

export default connect(mapStateToProps)(Signin);
