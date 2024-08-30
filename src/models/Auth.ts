import { ItemType } from './Permission';

export type AuthType = {
  user: string;
  pass: string;
};

export type AuthResponseLoginType = {
  success: boolean;
  message: string;
  result: {
    userId: string;
    token: string;
    position: string;
    roles: {
      [key: string]: ItemType[];
    };
  };
};

export type ActiveType = {
  email: string;
};

export type OtpType = {
  email: string;
  otp: string;
};
