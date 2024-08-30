import { call, put, takeEvery } from "redux-saga/effects";
import {
  getLocation,
  deleteLocation,
  getPaid,
  getVerify,
} from "../../api/backend_helper";
import {
  getLocationFailed,
  getLocationSuccess,
  addLocationFailed,
  addLocationSuccess,
  editLocationFailed,
  editLocationSuccess,
  deleteLocationFailed,
  deleteLocationSuccess,
  getPaidSuccess,
  getPaidFailed,
  getVerifySuccess,
  getVerifyFailed,
} from "./slice";
import { CRUD_LOCATION } from "../../api/url_helper";
import axios from "axios";

function* handleGetLocation(action: any): Generator<any, void, any> {
  try {
    const { page, limit, keyword, status } = action.payload;
    const response = yield call(getLocation, { page, limit, keyword, status });
    yield put(getLocationSuccess(response));
  } catch (error: any) {
    yield put(getLocationFailed(error.message));
  }
}

function* handleAddLocation(action: any): Generator<any, void, any> {
  try {
    const { values, files } = action.payload;
    const data = new FormData();
    data.append("forestOwnerId", values.forestOwnerId);
    data.append("companyId", values.companyId);
    data.append("inCharge", values.inCharge);
    data.append("province", values.province);
    data.append("district", values.district);
    data.append("commune", values.commune);
    data.append("details", values.details);
    data.append("area", values.area);
    data.append("startMining", values.startMining);
    data.append("endMining", values.endMining);
    data.append("note", values.note);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }
    }

    const response = yield call(axios.post, CRUD_LOCATION, data, {
      withCredentials: true,
    });

    yield put(addLocationSuccess(response.data));
  } catch (error: any) {
    yield put(addLocationFailed(error?.response?.data));
  }
}

function* handleEditLocation(action: any): Generator<any, void, any> {
  try {
    const { values, files, id, updatedRemovedFiles } = action.payload;

    const data = new FormData();
    if (values.forestOwnerId) {
      data.append("forestOwnerId", values.forestOwnerId);
      data.append("companyId", values.companyId);
      data.append("inCharge", values.inCharge);
      data.append("province", values.province);
      data.append("district", values.district);
      data.append("commune", values.commune);
      data.append("details", values.details);
      data.append("area", values.area);
      data.append("startMining", values.startMining);
      data.append("endMining", values.endMining);
      data.append("note", values.note);
    } else if (values.contractDate) {
      data.append("contractDate", values.contractDate);
      data.append("addendumDate", values.addendumDate);
      data.append("startDelivery", values.startDelivery);
      data.append("endDelivery", values.endDelivery);
    } else if (values.manifestDate) {
      data.append("manifestDate", values.manifestDate);
    } else if (values.forestDistrict) {
      data.append("forestDistrict", values.forestDistrict);
    } else if (values.verifyDate) {
      data.append("verifyDate", values.verifyDate);
    } 
 

    if (updatedRemovedFiles && updatedRemovedFiles.length > 0) {
      updatedRemovedFiles.forEach((value: string, index: number) => {
        data.append(`removeFiles[]`, value);
      });
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }
    }

    const response = yield call(axios.put, `${CRUD_LOCATION}/${id}`, data, {
      withCredentials: true,
    });

    yield put(editLocationSuccess(response.data));
  } catch (error: any) {
    yield put(editLocationFailed(error?.response?.data));
  }
}

// function* handleEditLocation(action: any): Generator<any, void, any> {
//   try {
//     const { id, data } = action.payload;
//     const response = yield call(editLocation, id, data);
//     yield put(editLocationSuccess(response));
//   } catch (error: any) {
//     yield put(editLocationFailed(error));
//   }
// }

function* handleDeleteLocation(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;
    const response = yield call(deleteLocation, id);
    yield put(deleteLocationSuccess(response));
  } catch (error: any) {
    yield put(deleteLocationFailed(error?.response?.data));
  }
}

function* handlePaidLocation(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getPaid, action.payload);
    yield put(getPaidSuccess(response));
  } catch (error: any) {
    yield put(getPaidFailed(error.response));
  }
}

function* handleVerifyLocation(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getVerify, action.payload);
    yield put(getVerifySuccess(response));
  } catch (error: any) {
    yield put(getVerifyFailed(error.response));
  }
}

export default function* locationSaga() {
  yield takeEvery("location/getLocation", handleGetLocation);
  yield takeEvery("location/addLocation", handleAddLocation);
  yield takeEvery("location/editLocation", handleEditLocation);
  yield takeEvery("location/deleteLocation", handleDeleteLocation);
  yield takeEvery("location/getPaid", handlePaidLocation);
  yield takeEvery("location/getVerify", handleVerifyLocation);
}
