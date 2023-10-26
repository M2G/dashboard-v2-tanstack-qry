import type { JSX } from 'react';
import { useCallback, useContext, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { signinUserAction } from '@/store/signin/actions';
import SigninForm from '@/components/SigninForm';
import { INITIAL_VALUES } from './constants';
import { AuthContext } from '@/AuthContext';

interface ISignin {
  loading: boolean;
  signin: any;
}

function Signin({ loading, signin }: ISignin): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e: { email: string; password: string }) => dispatch(signinUserAction(e)),
    [dispatch],
  );

  useEffect(() => {
    signin?.token && activateAuth(signin.token);
  }, [activateAuth, signin?.token]);

  return <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

const mapStateToProps = (state: { signin: { data: any; loading: any } }) => {
  return {
    loading: state.signin.loading,
    signin: state.signin.data,
  };
};

export default connect(mapStateToProps)(Signin);
