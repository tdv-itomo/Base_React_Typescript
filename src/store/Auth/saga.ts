import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailed, logoutSuccess } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseLoginType, AuthType } from '../../models/Auth';
import { login, logout } from '../../api/backend_helper';

function* onLogin(
  action: PayloadAction<AuthType>
): Generator<any, void, AuthResponseLoginType> {
  try {
    const response = yield call(login, action.payload);
    localStorage.setItem('accessToken', response.result.token);
    localStorage.setItem('permissions', JSON.stringify(response.result.roles));
    localStorage.setItem('role', response.result.position);
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailed(error));
  }
}

function* onLogout(): Generator<any, void, any> {
  try {
    const response = yield call(logout);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('permissions');
    localStorage.removeItem('role');
    yield put(logoutSuccess(response));
    window.location.href = '/login';
  } catch (error: any) {
    yield put(loginFailed(error));
  }
}

function* AuthSaga() {
  yield takeLatest('auth/login', onLogin);
  yield takeLatest('auth/logout', onLogout);
}

export default AuthSaga;
