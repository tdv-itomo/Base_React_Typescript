import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getListUser,
  getByMyself,
} from '../../api/backend_helper';
import {
  getUserFailed,
  getUserSuccess,
  addUserFailed,
  addUserSuccess,
  editUserFailed,
  editUserSuccess,
  deleteUserFailed,
  deleteUserSuccess,
  getListUserSuccess,
  getListUserFailed,
  getByMyselfSuccess,
  getByMyselfFailed,
  IUser,
} from './slice';

interface MyUserResponse {
  success: boolean;
  result: IUser;
}

function* handleGetUser(action: any): Generator<any, void, any> {
  try {
    const { page, limit, keyword } = action.payload;
    const response = yield call(getUser, { page, limit, keyword });
    yield put(getUserSuccess(response));
  } catch (error: any) {
    yield put(getUserFailed(error.message));
  }
}

function* handleAddUser(action: any): Generator<any, void, any> {
  try {
    const response = yield call(addUser, action.payload);
    yield put(addUserSuccess(response));
  } catch (error: any) {
    yield put(addUserFailed(error.response.data.message));
  }
}

function* handleEditUser(action: any): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const response = yield call(editUser, id, data);
    yield put(editUserSuccess(response));
  } catch (error: any) {
    yield put(editUserFailed(error.response.data.message));
  }
}

function* handleDeleteUser(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;
    const response = yield call(deleteUser, id);
    yield put(deleteUserSuccess(response));
  } catch (error: any) {
    yield put(deleteUserFailed(error));
  }
}

function* handleGetListUser(action: any): Generator<any, void, any> {
  try {
    const { page, limit, keyword } = action.payload;
    const response = yield call(getListUser, { page, limit, keyword });
    yield put(getListUserSuccess(response));
  } catch (error: any) {
    yield put(getListUserFailed(error.message));
  }
}

function* onGetByMyself(): Generator<any, void, any> {
  try {
    const response = yield call(getByMyself);
    yield put(getByMyselfSuccess(response));
  } catch (error: any) {
    yield put(getByMyselfFailed(error.message));
  }
}

export default function* UserSaga() {
  yield takeEvery('user/getUser', handleGetUser);
  yield takeEvery('user/addUser', handleAddUser);
  yield takeEvery('user/editUser', handleEditUser);
  yield takeEvery('user/deleteUser', handleDeleteUser);
  yield takeEvery('user/getListUser', handleGetListUser);
  yield takeEvery('user/getByMyself', onGetByMyself);
}
