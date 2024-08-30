import { call, put, takeEvery } from "redux-saga/effects";
import {
  getWood,
  deleteWood,
  createWood,
  updateWood,
} from "../../api/backend_helper";
import {
  getWoodFailed,
  getWoodSuccess,
  addWoodFailed,
  addWoodSuccess,
  editWoodFailed,
  editWoodSuccess,
  deleteWoodFailed,
  deleteWoodSuccess,
} from "./slice";

function* handleGetWood(action: any): Generator<any, void, any> {
  try {
    const { page, limit, id } = action.payload;
    const query = { page, limit };
    const response = yield call(getWood, id, query);
    yield put(getWoodSuccess(response));
  } catch (error: any) {
    yield put(getWoodFailed(error.message));
  }
}

function* handleAddWood(action: any): Generator<any, void, any> {
  try {
    const response = yield call(createWood, action.payload);
    console.log(response,'saga');
    yield put(addWoodSuccess(response));
  } catch (error: any) {
    yield put(addWoodFailed(error.message));
  }
}

function* handleEditWood(action: any): Generator<any, void, any> {
  try {
    const { id, values } = action.payload;
    const response = yield call(updateWood, id, values);
    yield put(editWoodSuccess(response));
  } catch (error: any) {
    yield put(editWoodFailed(error.message));
  }
}

function* handleDeleteWood(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;
    const response = yield call(deleteWood, id);
    yield put(deleteWoodSuccess(response));
  } catch (error: any) {
    yield put(deleteWoodFailed(error.message));
  }
}

export default function* woodSaga() {
  yield takeEvery("wood/getWood", handleGetWood);
  yield takeEvery("wood/addWood", handleAddWood);
  yield takeEvery("wood/editWood", handleEditWood);
  yield takeEvery("wood/deleteWood", handleDeleteWood);
}
