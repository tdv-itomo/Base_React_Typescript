import { PayloadAction } from '@reduxjs/toolkit';
import { paginator } from '../../models/Paginator';
import { getPermissions, updatePermission } from '../../api/backend_helper';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getPermissionsFailed,
  getPermissionsSuccess,
  updatePermissionFailed,
  updatePermissionSuccess,
} from './slice';

function* onGetPermissions(
  action: PayloadAction<paginator>
): Generator<any, void, any> {
  try {
    const response = yield call(getPermissions, action.payload);
    yield put(getPermissionsSuccess(response.result));
  } catch (error: any) {
    yield put(getPermissionsFailed(error.response.data));
  }
}

function* onUpdatePermission(action: PayloadAction<any>): Generator {
  try {
    const { id, data } = action.payload;
    const response = yield call(updatePermission, id, data);
    yield put(updatePermissionSuccess(response));
  } catch (error: any) {
    yield put(updatePermissionFailed(error.response.data));
  }
}

export default function* PermissionSaga() {
  yield takeLatest('permission/getPermissions', onGetPermissions);
  yield takeLatest('permission/updatePermission', onUpdatePermission);
}
