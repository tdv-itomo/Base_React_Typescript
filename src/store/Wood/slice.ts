import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  species: string;
  avgDiameter: number;
  avgHeight: number;
  weight: number;
  note: string;
  miningId: string;
  lot: string;
  compartment: string;
  subCompartment: string;
  growCode: string;
}

export interface Result {
  totalQuantity: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: Item[];
}

export interface ApiResponse {
  success: boolean;
  result: Result;
}

export interface WoodState {
  data: ApiResponse | null;
  loading: boolean;
  error: AxiosError | null;
  addWoodData: ApiResponse | null;
  errorAddWood: AxiosError | null;
  editWoodData: ApiResponse | null;
  errorEditWood: AxiosError | null;
  deleteWoodData: ApiResponse | null;
  errorDeleteWood: AxiosError | null;
}

const initialState: WoodState = {
  data: null,
  loading: false,
  error: null,
  addWoodData: null,
  errorAddWood: null,
  editWoodData: null,
  errorEditWood: null,
  deleteWoodData: null,
  errorDeleteWood: null,
};

const woodSlice = createSlice({
  name: "wood",
  initialState,
  reducers: {
    getWood: (state) => {
      state.loading = true;
    },
    getWoodSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getWoodFailed: (state, action: PayloadAction<AxiosError>) => {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    addWood: (state) => {
      state.loading = true;
    },
    addWoodSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.addWoodData = action.payload;
      state.loading = false;
      state.errorAddWood = null;
    },
    addWoodFailed: (state, action: PayloadAction<AxiosError>) => {
      state.addWoodData = null;
      state.loading = false;
      state.errorAddWood = action.payload;
    },
    editWood: (state) => {
      state.loading = true;
    },
    editWoodSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.editWoodData = action.payload;
      state.loading = false;
      state.errorEditWood = null;
    },
    editWoodFailed: (state, action: PayloadAction<AxiosError>) => {
      state.editWoodData = null;
      state.loading = false;
      state.errorEditWood = action.payload;
    },
    deleteWood: (state) => {
      state.loading = true;
    },
    deleteWoodSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.deleteWoodData = action.payload;
      state.loading = false;
      state.errorDeleteWood = null;
    },
    deleteWoodFailed: (state, action: PayloadAction<AxiosError>) => {
      state.deleteWoodData = null;
      state.loading = false;
      state.errorDeleteWood = action.payload;
    },
    setDataNull: (state) => {
      state.data = null;
      state.addWoodData = null;
      state.editWoodData = null;
      state.deleteWoodData = null;
      state.error = null;
      state.errorAddWood = null;
      state.errorEditWood = null;
      state.errorDeleteWood = null;
    },
  },
});

export const {
  getWood,
  getWoodSuccess,
  getWoodFailed,
  addWood,
  addWoodSuccess,
  addWoodFailed,
  editWood,
  editWoodSuccess,
  editWoodFailed,
  deleteWood,
  deleteWoodSuccess,
  deleteWoodFailed,
  setDataNull,
} = woodSlice.actions;
export default woodSlice.reducer;
