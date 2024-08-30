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

//permission
export const PERMISSION = `${site}/api/v1/permissions`;
