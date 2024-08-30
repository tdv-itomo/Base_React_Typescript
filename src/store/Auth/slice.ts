import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseLoginType, AuthType } from '../../models/Auth';
import { AxiosError } from 'axios';

export interface AuthState {
  login: {
    data: AuthResponseLoginType | null;
    loading: boolean;
    error: AxiosError<{ message: string }, any> | null;
  };
  logout: {
    success: boolean;
    loading: boolean;
    error: AxiosError | null;
  };
}

const initialState: AuthState = {
  login: {
    data: null,
    loading: false,
    error: null,
  },
  logout: {
    success: false,
    loading: false,
    error: null,
  },
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, _action: PayloadAction<AuthType>) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponseLoginType>) => {
      state.login.data = action.payload;
      state.login.loading = false;
    },
    loginFailed: (
      state,
      action: PayloadAction<AxiosError<{ message: string }, any>>
    ) => {
      state.login.error = action.payload;
      state.login.loading = false;
    },
    logout: (state) => {
      state.logout.loading = true;
    },
    logoutSuccess: (state) => {
      state.logout.success = true;
      state.logout.loading = false;
    },
    logoutFailed: (state, action: PayloadAction<AxiosError>) => {
      state.logout.error = action.payload;
      state.logout.loading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
} = AuthSlice.actions;
export default AuthSlice.reducer;
