import type { JSX } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signupUserAction } from '@/store/signup/actions';
import SignupForm from '@/components/SignupForm';
import { INITIAL_VALUES } from './constants';

function Signup(): JSX.Element {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
      (e) => dispatch(signupUserAction(e)),
      [dispatch],
  );

  return <SignupForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signup;
