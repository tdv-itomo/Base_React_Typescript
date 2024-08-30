import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useRef } from 'react';

const SetPassword = () => {
  const toast = useRef<Toast>(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      confirmPassword: Yup.string()
        .required('Vui lòng nhập lại mật khẩu')
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div>
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
          <h4 className='text-3xl text-center p-5'>Tạo mật khẩu</h4>
          <div className='flex flex-column mb-4 '>
            <label
              htmlFor='password'
              className='mb-2'>
              Mật khẩu
            </label>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-user' />
              <Password
                value={formik.values.password}
                onChange={formik.handleChange}
                id='password'
                name='password'
                autoComplete='on'
                type='password'
                placeholder='Mật khẩu'
                className='w-full py-3 border-round-xl'
                invalid={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
            </IconField>
            {formik.touched.password && formik.errors.password ? (
              <p style={{ color: 'red', marginTop: '5px', fontSize: '0.9rem' }}>
                {String(formik.errors.password)}
              </p>
            ) : null}
          </div>
          <div className='flex flex-column mb-2'>
            <label
              className='mb-2'
              htmlFor='confirmPassword'>
              Nhập lại mật khẩu
            </label>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-lock z-1' />
              <Password
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                id='confirmPassword'
                name='confirmPassword'
                type='confirmPassword'
                placeholder='Mật khẩu'
                autoComplete='on'
                className='w-full padding-left-confirmPassword'
                inputClassName='w-full py-3 border-round-xl'
                pt={{
                  iconField: {
                    root: { className: 'w-full' },
                  },
                }}
                toggleMask
                feedback={false}
                invalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
              />
            </IconField>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p style={{ color: 'red', fontSize: '0.9rem' }}>
                {String(formik.errors.confirmPassword)}
              </p>
            ) : null}
          </div>
          <Button
            type='submit'
            label='Đăng nhập'
            style={{ height: '35px' }}
            className='w-full my-5 border-round-xl'
            onClick={handleSubmit}
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
    </div>
  );
};

export default SetPassword;
