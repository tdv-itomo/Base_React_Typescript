import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface Company {
  id: string;
  name: string;
  code: string;
  phone: string;
  represent: string;
  position: string;
  province: string;
  district: string;
  commune: string;
  details: string;
}

export interface CompanyData {
  result: {
    items: Company[];
  };
  success: boolean;
}

export interface CompanyState {
  data: CompanyData | null;
  loading: boolean;
  error: string | null;
  addCompanyData: Company | null;
  errorAddCompany: AxiosError | null;
  editCompanyData: Company | null;
  errorEditCompany: AxiosError | null;
  deleteCompanyData: string | null;
  errorDeleteCompany: AxiosError | null;
}

const initialState: CompanyState = {
  data: null,
  loading: false,
  error: null,
  addCompanyData: null,
  errorAddCompany: null,
  editCompanyData: null,
  errorEditCompany: null,
  deleteCompanyData: null,
  errorDeleteCompany: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getCompany: (state) => {
      state.loading = true;
    },
    getCompanySuccess: (state, action: PayloadAction<CompanyData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCompanyFailed: (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    addCompany: (state) => {
      state.loading = true;
    },
    addCompanySuccess: (state, action) => {
      state.addCompanyData = action.payload;
      state.loading = false;
      state.errorAddCompany = null;
    },
    addCompanyFailed: (state, action: PayloadAction<AxiosError>) => {
      state.addCompanyData = null;
      state.loading = false;
      state.errorAddCompany = action.payload;
    },
    editCompany: (state) => {
      state.loading = true;
    },
    editCompanySuccess: (state, action) => {
      state.editCompanyData = action.payload;
      state.loading = false;
      state.errorEditCompany = null;
    },
    editCompanyFailed: (state, action: PayloadAction<AxiosError>) => {
      state.editCompanyData = null;
      state.loading = false;
      state.errorEditCompany = action.payload;
    },
    deleteCompany: (state) => {
      state.loading = true;
    },
    deleteCompanySuccess: (state, action) => {
      state.deleteCompanyData = action.payload;
      state.loading = false;
      state.errorDeleteCompany = null;
    },
    deleteCompanyFailed: (state, action: PayloadAction<AxiosError>) => {
      state.deleteCompanyData = null;
      state.loading = false;
      state.errorDeleteCompany = action.payload;
    },
    setDataNull: (state) => {
      state.addCompanyData = null;
      state.editCompanyData = null;
      state.deleteCompanyData = null;
      state.errorAddCompany = null;
      state.errorEditCompany = null;
      state.errorDeleteCompany = null;
    },
  },
});

export const {
  getCompany,
  getCompanySuccess,
  getCompanyFailed,
  addCompany,
  addCompanySuccess,
  addCompanyFailed,
  editCompany,
  editCompanySuccess,
  editCompanyFailed,
  deleteCompany,
  deleteCompanySuccess,
  deleteCompanyFailed,
  setDataNull,
} = companySlice.actions;
export default companySlice.reducer;
