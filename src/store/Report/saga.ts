import { PayloadAction } from '@reduxjs/toolkit';
import { paginator } from '../../models/Paginator';
import { getReport } from '../../api/backend_helper';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getReportFailed, getReportSuccess } from './slice';

function* onGetReport(
  action: PayloadAction<paginator>
): Generator<any, void, any> {
  try {
    const response = yield call(getReport, action.payload);
    yield put(getReportSuccess(response));
  } catch (error: any) {
    yield put(getReportFailed(error));
  }
}

export default function* ReportSaga() {
  yield takeEvery('report/getReport', onGetReport);
}
