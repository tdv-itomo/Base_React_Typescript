import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputOtp } from 'primereact/inputotp';

const VerifyOtp = () => {
  const toast = useRef<Toast>(null);
  const [invalidToken, setInvalidToken] = useState<boolean>(false);
  const [token, setTokens] = useState<string | number | undefined>();

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state;

  const isValidToken = (token: string | number | undefined): boolean => {
    const tokenLength = 4;
    return token?.toString().length === tokenLength;
  };

  const handleChangeToken = (e: any) => {
    setTokens(e.value);
    setInvalidToken(false);
  };

  const handleChangeEmail = () => {
    navigate(-1);
  };
  const handleResendOtp = () => {};

  const handleSendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInvalidToken(!isValidToken(token));
    if (isValidToken(token)) {
      console.log('Email không hợp lệ');
    }
  };

  return (
    <>
      <form
        className='card p-5 border-round-xl'
        style={{ minWidth: '450px', minHeight: '65vh' }}>
        <Toast ref={toast} />
        <div className='card bg-white p-3 border-round-xl'>
          <div className='text-center p-5'>
            <img
              src={logo}
              width={120}
              alt='logo'
            />
          </div>
          <h4 className='text-3xl text-center p-5'>Nhập mã xác nhận</h4>
          <div className='flex flex-column align-items-center mb-4 gap-2 '>
            <p>Nhập mã xác nhận đã được gửi về Email:</p>
            <p className='text-primary font-bold pb-3'>
              {email}
              <span
                className='underline text-red-500 ml-2 cursor-pointer'
                onClick={handleChangeEmail}>
                Thay đổi
              </span>
            </p>
            <InputOtp
              value={token}
              name='token'
              id='token'
              onChange={handleChangeToken}
              invalid={invalidToken}
            />
            {invalidToken ? (
              <p className='text-red-500 pt-1'>Mã xác nhận không hợp lệ</p>
            ) : null}
          </div>
          <div className='flex justify-content-center'>
            <p className='text-center'>
              Không nhận được mã?
              <span
                className='text-primary cursor-pointer ml-2'
                onClick={handleResendOtp}>
                Gửi lại
              </span>
            </p>
          </div>
          <Button
            type='submit'
            label='Xác nhận'
            style={{ height: '35px' }}
            className='w-full my-5 border-round-xl'
            onClick={handleSendEmail}
          />
        </div>
      </form>
    </>
  );
};
export default VerifyOtp;
