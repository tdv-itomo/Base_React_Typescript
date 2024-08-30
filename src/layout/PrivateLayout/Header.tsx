import { useRef, useState, useContext, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import { Image } from 'primereact/image';
import SidebarMenu from './SidebarMenu';
import { DataContext } from '../../contexts/data/DataProvider';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../store/Auth/slice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getByMyself } from '../../store/User/slice';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from 'primereact/menuitem';

const Header = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const accountMenu = useRef<Menu>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { titlePage } = useContext(DataContext);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      document.title = titlePage;
    }
  }, [titlePage, dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(getByMyself());
    }
  }, [dispatch, token]);

  const { information } = useSelector(
    (state: RootState) => ({
      information: state.User.dataByMyself,
    }),
    shallowEqual
  );

  const profileMenuItems: MenuItem[] = [
    {
      template: () => <></>,
    },
    {
      label: 'Tài khoản',
      items: [
        {
          label: 'Đăng xuất',
          icon: (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className='mr-2 text-red-500'
            />
          ),
          command: async () => {
            dispatch(logout());
            navigate('/login');
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className='flex align-items-center justify-content-between bg-white h-5rem xl:px-3'>
        <div className='flex relative'>
          <div className='flex flex-row align-items-center'>
            <div onClick={() => setMobileMenuVisible(true)}>
              <i
                className='pi pi-bars p-3 cursor-pointer xl:hidden'
                style={{ fontSize: '1.5rem' }}></i>
            </div>
            <h3 className='text-primary ml-1'>{titlePage}</h3>
          </div>
        </div>

        <div className='flex flex-row align-items-center'>
          <div
            className='flex align-items-center cursor-pointer p-3 gap-3 border-round text-700'
            onClick={(event) => accountMenu.current?.toggle(event)}>
            <Menu
              model={profileMenuItems}
              popup
              ref={accountMenu}
              className='w-auto border-round-xl'
              pt={{ menuitem: { className: 'mx-2' } }}
            />
            <div className='flex flex-column align-items-end'>
              {/* <span className='font-bold'>{information?.name}</span>
              <span className='font-normal'>{information?.user}</span> */}
              <span className='font-bold'>Tiendiepvu2001@gmail.com</span>
              <span className='font-normal'>Tiến Điệp Vũ</span>
            </div>
            <div className='text-primary'>
              <FontAwesomeIcon icon={faCircleChevronDown} />
            </div>
          </div>
        </div>
      </div>
      {/* SidebarMenu Mobile */}
      <div className='card flex justify-content-center'>
        <Sidebar
          header={
            <div className='pl-3'>
              <Image
                src={logo}
                alt='Image'
                width='120'
              />
            </div>
          }
          showCloseIcon={false}
          visible={mobileMenuVisible}
          onHide={() => setMobileMenuVisible(false)}>
          <SidebarMenu
            setMobileMenuVisible={() => setMobileMenuVisible(false)}
            mobile={mobileMenuVisible}
          />
        </Sidebar>
      </div>
    </>
  );
};
export default Header;
