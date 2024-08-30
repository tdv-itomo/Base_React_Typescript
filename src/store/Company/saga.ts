import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getCompany,
  addCompany,
  editCompany,
  deleteCompany,
} from '../../api/backend_helper';
import {
  getCompanyFailed,
  getCompanySuccess,
  addCompanyFailed,
  addCompanySuccess,
  editCompanyFailed,
  editCompanySuccess,
  deleteCompanyFailed,
  deleteCompanySuccess,
} from './slice';

function* handleGetCompany(action: any): Generator<any, void, any> {
  try {
    const { page, limit, keyword } = action.payload;
    const response = yield call(getCompany, { page, limit, keyword });
    yield put(getCompanySuccess(response));
  } catch (error: any) {
    yield put(getCompanyFailed(error.message));
  }
}

function* handleAddCompany(action: any): Generator<any, void, any> {
  try {
    const response = yield call(addCompany, action.payload);
    yield put(addCompanySuccess(response));
  } catch (error: any) {
    yield put(addCompanyFailed(error.response.data.message));
  }
}

function* handleEditCompany(action: any): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const response = yield call(editCompany, id, data);
    yield put(editCompanySuccess(response));
  } catch (error: any) {
    yield put(editCompanyFailed(error.response.data.message));
  }
}

function* handleDeleteCompany(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;
    const response = yield call(deleteCompany, id);
    yield put(deleteCompanySuccess(response));
  } catch (error: any) {
    yield put(deleteCompanyFailed(error.response.data.message));
  }
}

export default function* CompanySaga() {
  yield takeEvery('company/getCompany', handleGetCompany);
  yield takeEvery('company/addCompany', handleAddCompany);
  yield takeEvery('company/editCompany', handleEditCompany);
  yield takeEvery('company/deleteCompany', handleDeleteCompany);
}
