import { useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/Auth/slice';
import { RootState } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import './login.css';

export default function Login() {
  const toast = useRef<Toast>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Tên đăng nhập không được để trống'),
      password: Yup.string().required('Mật khẩu không được để trống'),
    }),
    onSubmit: async (values) => {
      // dispatch(login(values));
    },
  });

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const { dataLogin, errorLogin } = useSelector(
    (state: RootState) => ({
      dataLogin: state.Auth.login.data,
      errorLogin: state.Auth.login.error,
    }),
    shallowEqual
  );

  // useEffect(() => {
  //   if (dataLogin) {
  //     toast.current?.show({
  //       severity: 'success',
  //       summary: 'Thành công',
  //       detail: 'Đăng nhập thành công',
  //       life: 3000,
  //     });
  //     window.location.href = '/';
  //   }
  // }, [dataLogin]);

  // useEffect(() => {
  //   if (errorLogin) {
  //     toast.current?.show({
  //       severity: 'error',
  //       summary: 'Đăng nhập thất bại',
  //       detail: errorLogin?.response?.data.message || 'Đã có lỗi xảy ra',
  //       life: 3000,
  //     });
  //   }
  // }, [errorLogin]);

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
              width={150}
              alt='logo'
            />
          </div>
          <h4 className='text-3xl text-center p-5'>Đăng nhập</h4>
          <div className='flex flex-column mb-4 '>
            <label
              htmlFor='username'
              className='mb-2'>
              Tên đăng nhập
            </label>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-user' />
              <InputText
                value={formik.values.username}
                onChange={formik.handleChange}
                ref={usernameRef}
                id='username'
                name='username'
                autoComplete='on'
                type='text'
                placeholder='Tên đăng nhập'
                className='w-full py-3 border-round-xl'
                invalid={
                  formik.touched.username && formik.errors.username
                    ? true
                    : false
                }
              />
            </IconField>
            {formik.touched.username && formik.errors.username ? (
              <p style={{ color: 'red', marginTop: '5px', fontSize: '0.9rem' }}>
                {String(formik.errors.username)}
              </p>
            ) : null}
          </div>
          <div className='flex flex-column mb-2'>
            <label
              className='mb-2'
              htmlFor='password'>
              Mật khẩu
            </label>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-lock z-1' />
              <Password
                value={formik.values.password}
                onChange={formik.handleChange}
                id='password'
                name='password'
                type='password'
                placeholder='Mật khẩu'
                autoComplete='on'
                className='w-full padding-left-password'
                inputClassName='w-full py-3 border-round-xl'
                pt={{
                  iconField: {
                    root: { className: 'w-full' },
                  },
                }}
                toggleMask
                feedback={false}
                invalid={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
            </IconField>
            {formik.touched.password && formik.errors.password ? (
              <p style={{ color: 'red', fontSize: '0.9rem' }}>
                {String(formik.errors.password)}
              </p>
            ) : null}
          </div>
          <Button
            type='submit'
            label='Đăng nhập'
            style={{ height: '35px' }}
            className='w-full my-5 border-round-xl'
            onClick={handleLogin}
          />
        </div>
      </form>
      <div className='pb-3 flex gap-2 justify-content-center'>
        <Link
          to={'/verify-email?type=active'}
          className='text-primary'
          style={{ textDecoration: 'none' }}>
          Kích hoạt tài khoản
        </Link>
        |
        <Link
          to={'/verify-email?type=reset'}
          className='text-primary'
          style={{ textDecoration: 'none' }}>
          Quên mật khẩu?
        </Link>
      </div>
    </>
  );
}
