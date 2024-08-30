import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface User {
  id: string;
  user: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  represent: string;
  position: string;
  address: string;
  files: string;
}

export interface IUser {
  id: string;
  user: string | null;
  name: string;
  code: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  commune: string;
  details: string;
  formatAddress: string;
  represent: string;
  position: string;
  note: string | null;
  isActive: boolean;
}

interface MyUserResponse {
  success: boolean;
  result: IUser;
}

interface UserItem {
  id: string;
  name: string;
}
interface UserListResult {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: UserItem[];
}

interface UserListResponse {
  success: boolean;
  result: UserListResult;
}
export interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
  addUserData: User | null;
  errorAddUser: AxiosError | null;
  editUserData: User | null;
  errorEditUser: AxiosError | null;
  deleteUserData: string | null;
  errorDeleteUser: string | null;
  dataList: UserListResponse  | null;
  errorDataList: string | null;
  dataByMyself: IUser | null;
  errorDataByMyself: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  addUserData: null,
  errorAddUser: null,
  editUserData: null,
  errorEditUser: null,
  deleteUserData: null,
  errorDeleteUser: null,
  dataList: null,
  errorDataList: null,
  dataByMyself: null,
  errorDataByMyself: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailed: (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
    addUser: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action) => {
      state.addUserData = action.payload;
      state.loading = false;
      state.errorAddUser = null;
    },
    addUserFailed: (state, action: PayloadAction<AxiosError>) => {
      state.addUserData = null;
      state.loading = false;
      state.errorAddUser = action.payload;
    },
    editUser: (state) => {
      state.loading = true;
    },
    editUserSuccess: (state, action) => {
      state.editUserData = action.payload;
      state.loading = false;
      state.errorEditUser = null;
    },
    editUserFailed: (state, action: PayloadAction<AxiosError>) => {
      state.editUserData = null;
      state.loading = false;
      state.errorEditUser = action.payload;
    },
    deleteUser: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteUserData = action.payload;
      state.loading = false;
      state.errorDeleteUser = null;
    },
    deleteUserFailed: (state, action) => {
      state.deleteUserData = null;
      state.loading = false;
      state.errorDeleteUser = action.payload;
    },
    getListUser: (state) => {
      state.loading = true;
    },
    getListUserSuccess: (state, action: PayloadAction<UserListResponse>) => {
      state.dataList = action.payload;
      state.loading = false;
      state.errorDataList = null;
    },
    getListUserFailed: (state, action) => {
      state.dataList = null;
      state.loading = false;
      state.errorDataList = action.payload;
    },
    getByMyself: (state) => {
      state.loading = true;
    },
    getByMyselfSuccess: (state, action: PayloadAction<MyUserResponse>) => {
      state.dataByMyself = action.payload.result;
      state.loading = false;
      state.errorDataByMyself = null;
    },
    getByMyselfFailed: (state, action) => {
      state.dataByMyself = null;
      state.loading = false;
      state.errorDataByMyself = action.payload;
    },
    setDataNull: (state) => {
      state.addUserData = null;
      state.editUserData = null;
      state.deleteUserData = null;
      state.errorAddUser = null;
      state.errorEditUser = null;
      state.errorDeleteUser = null;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserFailed,
  addUser,
  addUserSuccess,
  addUserFailed,
  editUser,
  editUserSuccess,
  editUserFailed,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailed,
  getListUser,
  getListUserSuccess,
  getListUserFailed,
  getByMyself,
  getByMyselfSuccess,
  getByMyselfFailed,
  setDataNull,
} = userSlice.actions;
export default userSlice.reducer;
