import { all, fork } from 'redux-saga/effects';
import AddressSaga from './Address/saga';
import AuthSaga from './Auth/saga';
import PermissionSaga from './Permission/saga';

export default function* rootSaga() {
  yield all([fork(AddressSaga), fork(AuthSaga), fork(PermissionSaga)]);
}
