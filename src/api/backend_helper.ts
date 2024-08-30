import { paginator } from '../models/Paginator';
import {
  AdminType,
  CompanyType,
  DowloadDoc,
  FileType,
  LocationType,
  Paid,
  QueryType,
  UserType,
  Verify,
} from '../models/Data';
import { get, post, put, del, getAddress } from './api_helper';
import * as url from './url_helper';
import { ActiveType, AuthType } from '../models/Auth';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const config_upload_file = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const authenticator = {
  withCredentials: true,
};

//-------------------------------------------------------------------------------------------------------->

export const login = (data: AuthType) => post(url.LOGIN, data, authenticator);
export const verifyEmail = (data: ActiveType) =>
  post(url.VERIFY_EMAIL, data, config);
export const verifyOTP = (data: ActiveType) =>
  post(url.VERIFY_OTP, data, config);
export const resetPassword = (data: ActiveType) =>
  post(url.RESET_PASSWORD, data, config);
export const logout = () => post(url.LOGOUT, config);

//Address
export const getProvinces = () => getAddress(url.GET_PROVINCES);
export const getDistricts = (stateID: number) =>
  getAddress(`${url.GET_DISTRICTS}/${stateID}`, config);
export const getWards = (districtID: number) =>
  getAddress(`${url.GET_WARDS}/${districtID}`, config);

//permissions

export const getPermissions = (query: paginator) =>
  get(`${url.PERMISSION}`, {
    params: query,
    ...config,
  });

export const updatePermission = (id: string, data: { list: number[] }) =>
  put(`${url.PERMISSION}/${id}`, data, config);
