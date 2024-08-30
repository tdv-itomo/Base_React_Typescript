import { call, put, takeEvery } from 'redux-saga/effects';
import { getDistricts, getProvinces, getWards } from '../../api/backend_helper';
import {
  getDistrictsFailed,
  getDistrictsSuccess,
  getProvincesFailed,
  getProvincesSuccess,
  getWardsFailed,
  getWardsSuccess,
} from './slice';
import { IDistrict, IProvince, IWard } from '../../models/Address';

function* onGetProvinces() {
  try {
    const response: IProvince[] = yield call(getProvinces);
    yield put(getProvincesSuccess(response));
  } catch (error) {
    yield put(getProvincesFailed(error));
  }
}

function* onGetDistricts(action: { type: string; payload: number }) {
  try {
    const response: IDistrict[] = yield call(getDistricts, action.payload);
    yield put(getDistrictsSuccess(response));
  } catch (error) {
    yield put(getDistrictsFailed(error));
  }
}

function* onGetWards(action: { type: string; payload: number }) {
  try {
    const response: IWard[] = yield call(getWards, action.payload);
    yield put(getWardsSuccess(response));
  } catch (error) {
    yield put(getWardsFailed(error));
  }
}

function* AddressSaga() {
  yield takeEvery('address/getProvinces', onGetProvinces);
  yield takeEvery('address/getDistricts', onGetDistricts);
  yield takeEvery('address/getWards', onGetWards);
}

export default AddressSaga;
