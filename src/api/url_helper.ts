export const site = 'http://localhost:3102';
// export const site = 'https://api.duclam.itomo.one';

//------------------------------------------------------------------------------------------------------------//

// Auth
export const LOGIN = `${site}/api/v1/auth/login`;
export const VERIFY_EMAIL = `${site}/api/v1/auth/forgot`;
export const VERIFY_OTP = `${site}/api/v1/auth/verify`;
export const RESET_PASSWORD = `${site}/api/v1/auth/reset`;
export const LOGOUT = `${site}/api/v1/auth/logout`;

// address
export const GET_PROVINCES = 'https://address.itomo.vn/v1/state/countryid/1';
export const GET_DISTRICTS = 'https://address.itomo.vn/v1/district/stateid';
export const GET_WARDS = 'https://address.itomo.vn/v1/ward/districtid';

// ForestOwner
export const FOREST_OWNER = `${site}/api/v1/forestOwners`;

//Company
export const CRUD_COMPANY = `${site}/api/v1/companies`;

//User
export const CRUD_USER = `${site}/api/v1/users`;
export const LIST_USER = `${site}/api/v1/users/list`;
export const GET_BY_MYSELF = `${site}/api/v1/users/me`;

export const GET_LOG = `${site}/api/v1/users/logs`;

//Location
export const CRUD_LOCATION = `${site}/api/v1/minings`;
export const GET_REPORT = `${site}/api/v1/minings/dashboard/web`;

export const GET_PAID = `${site}/api/v1/minings/paid`;

export const GET_VERIFY = `${site}/api/v1/minings/verify`;

//permission
export const PERMISSION = `${site}/api/v1/permissions`;

//contracts

export const GET_CONTRACT = `${site}/api/v1/contracts`;

export const GET_MINING_INFO = `${site}/api/v1/contracts/mining`;

export const VIEW_DOC = `${site}/api/v1/contracts/views`;

export const BROWSE = `${site}/api/v1/contracts/browse`;

export const SEND = `${site}/api/v1/contracts/send`;

export const DOWLOAD_DOC = `${site}/api/v1/views/downloads`;

//wood

export const CRUD_WOOD = `${site}/api/v1/woods`;
