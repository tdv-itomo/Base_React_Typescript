import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { paginator } from '../../models/Paginator';
import { PermissionType } from '../../models/Permission';
import { AxiosError } from 'axios';

export interface PermissionState {
  permissions: {
    data: PermissionType[] | null;
    loading: boolean;
    error: null | any;
  };
  updatePermission: {
    data: null | any;
    loading: boolean;
    error: null | any;
  };
}

const initialState: PermissionState = {
  permissions: {
    data: null,
    loading: false,
    error: null,
  },

  updatePermission: {
    data: null,
    loading: false,
    error: null,
  },
};

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    getPermissions: (state, action: PayloadAction<paginator>) => {
      state.permissions.loading = true;
    },
    getPermissionsSuccess: (state, action: PayloadAction<PermissionType[]>) => {
      state.permissions.data = action.payload;
      state.permissions.loading = false;
    },
    getPermissionsFailed: (state, action: PayloadAction<AxiosError>) => {
      state.permissions.error = action.payload;
      state.permissions.loading = false;
    },
    updatePermission: (
      state,
      action: PayloadAction<{ id: string; data: { list: number[] } }>
    ) => {
      state.updatePermission.loading = true;
    },
    updatePermissionSuccess: (state, action) => {
      state.updatePermission.data = action.payload;
      state.updatePermission.loading = false;
    },
    updatePermissionFailed: (state, action) => {
      state.updatePermission.error = action.payload;
      state.updatePermission.loading = false;
    },
    clearDataPermission: (state) => {
      state.updatePermission.data = null;
      state.updatePermission.error = null;
      state.updatePermission.loading = false;
    },
  },
});

export const {
  getPermissions,
  getPermissionsSuccess,
  getPermissionsFailed,
  updatePermission,
  updatePermissionSuccess,
  updatePermissionFailed,
  clearDataPermission,
} = permissionSlice.actions;

export default permissionSlice.reducer;
