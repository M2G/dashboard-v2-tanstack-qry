import type {
  AllEffect,
  StrictEffect,
  TakeEffect,
  CallEffect,
  ForkEffect,
} from 'redux-saga/effects';
import { all, fork, call, put, take } from 'redux-saga/effects';
import { history } from 'index';
import ROUTER_PATH from 'constants/RouterPath';
import signupUserService from './services';
import { SignupActionTypes } from './types';
import { signupUserSuccess, signupUserError } from './actions';
import { signupSuccess } from '../../actions';

function forwardTo(history: { push: Function }, location: string) {
  return history.push({ pathname: location });
}

function* authorize({
  email,
  password,
}: {
  email: string;
  password: string;
  redirect?: boolean;
}): Generator<StrictEffect, any, any> {
  try {
    const response = yield call(signupUserService, { email, password });

    yield put(signupUserSuccess({ ...response?.data }));
    yield put(signupSuccess());
    yield call(forwardTo, history, ROUTER_PATH.SIGNIN);
  } catch (err: any) {
    if (err instanceof Error) {
      return yield put(signupUserError({ ...(err.stack as any) }));
    }

    yield put(signupUserError('An unknown error occured.'));
  }
}

function* watchSignup(): Generator<CallEffect | TakeEffect> {
  while (true) {
    const { user } = yield take(SignupActionTypes.SIGNUP_USER_REQUEST);
    yield call(authorize, user);
  }
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* signupSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([fork(watchSignup)]);
}

export { authorize, signupSaga };
