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

//Company
export const getCompany = (query: QueryType) =>
  get(`${url.CRUD_COMPANY}`, {
    params: query,
    ...config,
  });

export const addCompany = (data: CompanyType) =>
  post(url.CRUD_COMPANY, data, config);
export const editCompany = (id: string, data: CompanyType) =>
  put(`${url.CRUD_COMPANY}/${id}`, data, config);
export const deleteCompany = (id: string) =>
  del(`${url.CRUD_COMPANY}/${id}`, config);

//User
export const getUser = (query: QueryType) =>
  get(`${url.CRUD_USER}`, {
    params: query,
    ...config,
  });

export const getListUser = (query: QueryType) =>
  get(`${url.LIST_USER}`, {
    params: query,
    ...config,
  });

export const addUser = (data: UserType) => post(url.CRUD_USER, data, config);
export const editUser = (id: string, data: UserType) =>
  put(`${url.CRUD_USER}/${id}`, data, config);
export const deleteUser = (id: string) => del(`${url.CRUD_USER}/${id}`, config);
export const getByMyself = () => get(url.GET_BY_MYSELF, config);

export const getLog = (id: string) => get(`${url.GET_LOG}/${id}`, config);

//Location
export const getLocation = (query: QueryType) =>
  get(`${url.CRUD_LOCATION}`, {
    params: query,
    ...config,
  });

export const getReport = (query: paginator) =>
  get(url.GET_REPORT, {
    params: query,
    ...config,
  });

export const addLocation = (data: LocationType) =>
  post(url.CRUD_LOCATION, data, config_upload_file);
export const editLocation = (id: string, data: LocationType) =>
  put(`${url.CRUD_LOCATION}/${id}`, data, config_upload_file);
export const deleteLocation = (id: string) =>
  del(`${url.CRUD_LOCATION}/${id}`, config);

export const getVerify = (data: Verify) =>
  post(`${url.GET_VERIFY}`, data, config);

export const getPaid = (data: Paid) => post(`${url.GET_PAID}`, data, config);

//permissions

export const getPermissions = (query: paginator) =>
  get(`${url.PERMISSION}`, {
    params: query,
    ...config,
  });

export const updatePermission = (id: string, data: { list: number[] }) =>
  put(`${url.PERMISSION}/${id}`, data, config);

//contracts

export const getContracts = (id: string) =>
  get(`${url.GET_CONTRACT}/${id}`, config);

export const getMiningInfo = (id: string) =>
  get(`${url.GET_MINING_INFO}/${id}`, config);

export const viewDoc = (id: string, query: QueryType) =>
  get(`${url.VIEW_DOC}/${id}`, {
    params: query,
    ...config,
  });

export const postBrowse = (data: AdminType) =>
  post(`${url.BROWSE}`, data, config);

export const postSend = (data: AdminType) => post(`${url.SEND}`, data, config);

export const dowloadDoc = (data: DowloadDoc) =>
  post(`${url.DOWLOAD_DOC}`, data, config);

//wood

export const getWood = (id: string, query: QueryType) =>
  get(`${url.CRUD_WOOD}/${id}`, {
    params: query,
    ...config,
  });

export const createWood = (data: any) => post(url.CRUD_WOOD, data, config);

export const updateWood = (id: string, data: any) =>
  put(`${url.CRUD_WOOD}/${id}`, data, config);

export const deleteWood = (id: string) => del(`${url.CRUD_WOOD}/${id}`, config);
