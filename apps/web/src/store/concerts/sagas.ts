/* eslint-disable */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  getConcertsService,
  deleteUsersService,
  forgotPasswordService,
  getCurrentUserService,
  recoverPasswordService,
  updateUserProfilService,
  userProfilService,
} from './services';

import ROUTER_PATH from '@/constants/RouterPath';
import { history } from '@/index';
import { clearAuthStorage, clearUserStorage } from '@/services/storage';
import { signoutUserAction } from '@/store/signout/actions';
import Config from '../../constants';
import {
  authDeleteUserProfilError,
  authDeleteUserProfilSuccess,
  authForgotPasswordError,
  authForgotPasswordSuccess,
  authGetUserProfilError,
  authGetUserProfilSuccess,
  // authRequestErrorAction,
  authGetUsersProfilSuccess,
  authRecoverPasswordError,
  authRecoverPasswordSuccess,
  authUpdateUserProfilError,
  authUpdateUserProfilSuccess,
  getConcertsSuccess,
  getConcertsError,
} from './actions';
import { ConcertActionTypes } from './types';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function forwardTo(history: { push: Function }, location: string) {
  return history.push({ pathname: location });
}

function* getConcert(params: { id }): any {
  console.log('getConcert getConcert getConcert getConcert');
  try {
    /*const res: ResponseGenerator = yield call(userProfilService, params?.id);

    yield put(authGetUserProfilSuccess({ ...res.data }));*/
  } catch (err) {
    /* if (err?.response?.status === 401) {
      yield clearAuthStorage();
      yield clearUserStorage();
      yield call(forwardTo, history, ROUTER_PATH.SIGNIN);
      return yield put(signoutUserAction({ ...err.response.data.error }));
    }

    if (err instanceof Error) {
      return yield put(authGetUsersProfilError({ ...(err.stack as any) }));
    }

    yield put(authGetUserProfilError('An unknown error occured.'));*/
  }
}

function* getConcerts({
  filters,
  page,
  pageSize,
}: {
  filters: any;
  page: number;
  pageSize: number;
}): Promise<any> {
  try {
    const res = yield call(getConcertsService, { filters, page, pageSize });

    console.log('getConcerts getConcerts getConcerts getConcerts', res.data);

    yield put(getConcertsSuccess({ filters, ...res.data }));
  } catch (err) {
    if (err?.response?.status === 401) {
      yield clearAuthStorage();
      yield clearUserStorage();
      yield call(forwardTo, history, ROUTER_PATH.SIGNIN);
      return yield put(signoutUserAction({ ...err.response.data.error }));
    }

    if (err instanceof Error) {
      return yield put(getConcertsError({ ...(err.stack as any) }));
    }

    yield put(getConcertsError('An unknown error occured.'));
  }
}
function* watchConcert() {
  yield takeEvery(ConcertActionTypes.CONCERT_GET_REQUEST as any, getConcert);
}

function* watchConcerts() {
  yield takeEvery(ConcertActionTypes.CONCERTS_GET_REQUEST as any, getConcerts);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* concertSaga() {
  yield all([fork(watchConcert), fork(watchConcerts)]);
}

export { concertSaga, getConcert, getConcerts };
