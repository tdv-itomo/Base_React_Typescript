import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const VerifyEmail = () => {
  const toast = useRef<Toast>(null);
  const [email, setEmail] = useState<string>('');
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Quên mật khẩu');

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const type = urlParams.get('type');

  useEffect(() => {
    if (type === 'active') {
      setTitle('Kích hoạt tài khoản');
    } else if (type === 'reset') {
      setTitle('Quên mật khẩu');
    }
    emailRef.current?.focus();
  }, [type]);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setInvalidEmail(false);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInvalidEmail(!isValidEmail(email));
    if (isValidEmail(email)) {
      navigate('/otp', { state: email });
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
          <h4 className='text-3xl text-center p-5'>{title}</h4>
          <div className='flex flex-column mb-4 '>
            <label
              htmlFor='user'
              className='mb-2'>
              Email
            </label>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-envelope' />
              <InputText
                value={email}
                onChange={handleChangeEmail}
                ref={emailRef}
                id='email'
                name='email'
                autoComplete='on'
                type='text'
                placeholder='Nhập email'
                className='w-full py-3 border-round-xl'
                invalid={invalidEmail}
              />
            </IconField>
            {invalidEmail ? (
              <p className='text-red-500 pt-1'>Email không hợp lệ</p>
            ) : null}
          </div>
          <Button
            type='submit'
            label='Xác nhận'
            style={{ height: '35px' }}
            className='w-full my-5 border-round-xl'
            onClick={handleSubmit}
          />
        </div>
      </form>
      <div className='pb-3 flex gap-2 justify-content-center'>
        Trở về trang
        <Link
          to={'/login'}
          className='text-primary'
          style={{ textDecoration: 'none' }}>
          Đăng nhập
        </Link>
      </div>
    </>
  );
};

export default VerifyEmail;
