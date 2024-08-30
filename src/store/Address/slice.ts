import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AddressState = {
  provinces: {
    data: any;
    loading: boolean;
    error: any;
  };
  districts: {
    data: any;
    loading: boolean;
    error: any;
  };
  wards: {
    data: any;
    loading: boolean;
    error: any;
  };
};

const initialState: AddressState = {
  provinces: {
    data: [],
    loading: false,
    error: null,
  },
  districts: {
    data: [],
    loading: false,
    error: null,
  },
  wards: {
    data: [],
    loading: false,
    error: null,
  },
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    getProvinces: (state) => {
      state.provinces.loading = true;
    },
    getProvincesSuccess: (state, action) => {
      state.provinces.data = action.payload;
      state.provinces.loading = false;
    },
    getProvincesFailed: (state, action) => {
      state.provinces.error = action.payload;
      state.provinces.loading = false;
    },
    getDistricts: (state, action: PayloadAction<number>) => {
      state.districts.loading = true;
    },
    getDistrictsSuccess: (state, action) => {
      state.districts.data = action.payload;
      state.districts.loading = false;
    },
    getDistrictsFailed: (state, action) => {
      state.districts.error = action.payload;
      state.districts.loading = false;
    },
    getWards: (state, action: PayloadAction<number>) => {
      state.wards.loading = true;
    },
    getWardsSuccess: (state, action) => {
      state.wards.data = action.payload;
      state.wards.loading = false;
    },
    getWardsFailed: (state, action) => {
      state.wards.error = action.payload;
      state.wards.loading;
    },
    clearAddress: (state) => {
      state.districts.data = [];
      state.wards.data = [];
    },
  },
});

export const {
  getProvinces,
  getProvincesSuccess,
  getProvincesFailed,
  getDistricts,
  getDistrictsSuccess,
  getDistrictsFailed,
  getWards,
  getWardsSuccess,
  getWardsFailed,
  clearAddress,
} = addressSlice.actions;

export default addressSlice.reducer;
