import { all, fork } from 'redux-saga/effects';
import AddressSaga from './Address/saga';
import AuthSaga from './Auth/saga';
import CompanySaga from './Company/saga';
import UserSaga from './User/saga';
import LocationSaga from './Location/saga';
import PermissionSaga from './Permission/saga';
import ReportSaga from './Report/saga';
import WoodSaga from './Wood/saga';

export default function* rootSaga() {
  yield all([
    fork(AddressSaga),
    fork(AuthSaga),
    fork(CompanySaga),
    fork(UserSaga),
    fork(LocationSaga),
    fork(PermissionSaga),
    fork(ReportSaga),
    fork(WoodSaga),
  ]);
}
