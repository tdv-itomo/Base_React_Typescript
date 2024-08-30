import { createSlice ,PayloadAction } from "@reduxjs/toolkit";
import { FileType } from "../../models/Data";

export interface deleteResponse {
  success: boolean;
  message: string;
}

interface Location {
  id: string;
  forestOwnerId: string;
  locationId: string;
  area: string;
  startMining: string;
  endMining: string;
  details: string;
  inCharge: string;
  files: FileType[];
}

export interface LocationState {
  data: Location | null;
  loading: boolean;
  error: string | null;
  addLocationData: Location | null;
  errorAddLocation: any;
  editLocationData: Location | null;
  errorEditLocation: any;
  deleteLocationData: deleteResponse | null;
  errorDeleteLocation: deleteResponse | null;
  paidData: deleteResponse | null;
  errorPaid: deleteResponse | null;
  varifyData: deleteResponse | null;
  errorVarify: deleteResponse | null;
}

const initialState: LocationState = {
  data: null,
  loading: false,
  error: null,
  addLocationData: null,
  errorAddLocation: null,
  editLocationData: null,
  errorEditLocation: null,
  deleteLocationData: null,
  errorDeleteLocation: null,
  paidData: null,
  errorPaid: null,
  varifyData: null,
  errorVarify: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocation: (state) => {
      state.loading = true;
    },
    getLocationSuccess: (state, action: PayloadAction<Location>) => {
      state.data = action.payload;      
      state.loading = false;
      state.error = null;
    },
    getLocationFailed: (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    addLocation: (state) => {
      state.loading = true;
    },
    addLocationSuccess: (state, action: PayloadAction<any>) => {
      state.addLocationData = action.payload;
      state.loading = false;
      state.errorAddLocation = null;
    },
    addLocationFailed: (state, action: PayloadAction<any> ) => {
      state.addLocationData = null;
      state.loading = false;
      state.errorAddLocation = action.payload;
    },
    editLocation: (state) => {
      state.loading = true;
    },
    editLocationSuccess: (state, action) => {
      state.editLocationData = action.payload;
      state.loading = false;
      state.errorEditLocation = null;
    },
    editLocationFailed: (state, action ) => {
      state.editLocationData = null;
      state.loading = false;
      state.errorEditLocation = action.payload;
    },
    deleteLocation: (state) => {
      state.loading = true;
    },
    deleteLocationSuccess: (state, action) => {
      state.deleteLocationData = action.payload;
      state.loading = false;
      state.errorDeleteLocation = null;
    },
    deleteLocationFailed: (state, action: PayloadAction<any>) => {
      state.deleteLocationData = null;
      state.loading = false;
      state.errorDeleteLocation = action.payload;
    },
    getPaid: (state) => {
      state.loading = true;
    },
    getPaidSuccess: (state, action) => {
      state.paidData = action.payload;
      state.loading = false;
      state.errorPaid = null;
    },
    getPaidFailed: (state, action: PayloadAction<any>) => {
      state.paidData = null;
      state.loading = false;
      state.errorPaid = action.payload;
    },
    getVerify: (state) => {
      state.loading = true;
    },
    getVerifySuccess: (state, action) => {
      state.varifyData = action.payload;
      state.loading = false;
      state.errorVarify = null;
    },
    getVerifyFailed: (state, action: PayloadAction<any>) => {
      state.varifyData = null;
      state.loading = false;
      state.errorVarify = action.payload;
    },
    setDataNull: (state) => {
      state.addLocationData = null;
      state.editLocationData = null;
      state.deleteLocationData = null;
      state.errorAddLocation = null;
      state.errorEditLocation = null;
      state.errorDeleteLocation = null;
      state.errorPaid = null;
      state.errorVarify = null;
      state.paidData = null;
      state.varifyData = null;
    },
  },
});

export const {
  getLocation,
  getLocationSuccess,
  getLocationFailed,
  addLocation,
  addLocationSuccess,
  addLocationFailed,
  editLocation,
  editLocationSuccess,
  editLocationFailed,
  deleteLocation,
  deleteLocationSuccess,
  deleteLocationFailed,
  setDataNull,
  getPaid,
  getPaidSuccess,
  getPaidFailed,
  getVerify,
  getVerifySuccess,
  getVerifyFailed,
} = locationSlice.actions;
export default locationSlice.reducer;
