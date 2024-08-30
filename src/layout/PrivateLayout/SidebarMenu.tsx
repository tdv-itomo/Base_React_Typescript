import { useContext, useEffect, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Image } from 'primereact/image';
import { Tooltip } from 'primereact/tooltip';
import { Link } from 'react-router-dom';
import { MenuItem } from 'primereact/menuitem';
import { DataContext } from '../../contexts/data/DataProvider';
import logo from '../../assets/images/logo.png';
import shortLogo from '../../assets/images/favicon.webp';
import {
  IconReport,
  IconReportClick,
  IconDevice,
  IconDeviceClick,
  IconCompany,
  IconCompanyClick,
  IconUnit,
  IconUnitClick,
  IconUser,
  IconUserClick,
  IconPermission,
  IconPermissionClick,
  IconDelivery,
  IconDeliveryClick,
} from '../../components/icon';
import '../../assets/scss/theme-base/index.scss';

interface SidebarMenuProps {
  mobile?: boolean;
  setMobileMenuVisible: (value: boolean) => void;
}

export default function SidebarMenu({
  mobile,
  setMobileMenuVisible,
}: SidebarMenuProps) {
  const { setTitlePage } = useContext(DataContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const currentItem = findCurrentItem(location.pathname) as MenuItem;
    if (currentItem && currentItem.label) {
      setTitlePage(currentItem.label);
    } else if (location.pathname === '/device-profile') {
      setTitlePage('Hồ sơ thiết bị');
    } else {
      setTitlePage('');
    }
  }, [location.pathname]);

  const findCurrentItem = (pathname: string) => {
    for (const category of items) {
      for (const item of category.items || []) {
        if ((item as MenuItem).url === pathname) {
          return item as MenuItem;
        }
      }
    }
    return null;
  };

  const itemRenderer = (item: any) => {
    if (!item.url) {
      return null;
    }
    const isSelected =
      location.pathname === item.url ||
      (location.pathname === '/device-profile' && item.url === '/device');

    return (
      <Link
        to={item.url}
        className={`flex align-items-center hidden p-menuitem-content p-menuitem-link border-round-xl xl:ml-3 xl:mr-3 p-3 svg-hover ${
          isSelected ? 'text-white-alpha-90 bg-primary' : ''
        } ${isSidebarOpen ? '' : 'justify-content-center'}`}
        data-pr-tooltip={item.label}
        data-pr-position='right'
        onClick={mobile ? () => setMobileMenuVisible(false) : () => {}}>
        <span
          className={`p-menuitem-icon ${
            isSidebarOpen ? '' : 'menu-item-icon-only'
          }`}>
          {isSelected ? <span>{item.svgClick}</span> : <span>{item.svg}</span>}
        </span>
        {isSidebarOpen && (
          <span className='menu-item-text mr-3 white-space-nowrap ml-4'>
            {item.label}
          </span>
        )}
      </Link>
    );
  };

  const items: MenuItem[] = [
    {
      template: () => <></>,
    },
    {
      label: 'Báo cáo',
      items: [
        {
          label: 'Báo cáo',
          svg: IconReport,
          svgClick: IconReportClick,
          url: '/',
          template: itemRenderer,
        },
      ],
    },
    {
      label: 'Thao tác',
      items: [
        {
          label: 'Giao nhận',
          svg: IconDelivery,
          svgClick: IconDeliveryClick,
          url: '/delivery',
          template: itemRenderer,
        },
        {
          label: 'Thiết bị',
          svg: IconDevice,
          svgClick: IconDeviceClick,
          url: '/device',
          template: itemRenderer,
        },
      ],
    },
    {
      label: 'Danh mục',
      items: [
        {
          label: 'Công ty/ Đối tác',
          svg: IconCompany,
          svgClick: IconCompanyClick,
          url: '/company',
          template: itemRenderer,
        },
        {
          label: 'Đơn vị/ Phòng',
          svg: IconUnit,
          svgClick: IconUnitClick,
          url: '/unit',
          template: itemRenderer,
        },
        {
          label: 'Người dùng',
          svg: IconUser,
          svgClick: IconUserClick,
          url: '/users',
          template: itemRenderer,
        },
        {
          label: 'Phân quyền',
          svg: IconPermission,
          svgClick: IconPermissionClick,
          url: '/permissions',
          template: itemRenderer,
        },
      ].filter(Boolean) as MenuItem[],
    },
  ].filter(Boolean) as MenuItem[];

  return (
    <div
      className={`sidebar flex flex-column h-screen md:border-right-1 border-gray-200 ${
        isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}>
      {!isSidebarOpen && (
        <Tooltip
          target='.p-menuitem-link'
          showDelay={300}
          hideDelay={500}
        />
      )}
      <button
        className={`toggle-button ${isSidebarOpen ? 'btn-open' : 'btn-closed'}`}
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}>
        <i
          className={`pi ${
            isSidebarOpen
              ? 'pi-chevron-left text-primary text-sm'
              : 'pi-chevron-right text-primary text-sm'
          }`}></i>
      </button>
      <div className={`justify-content-center p-2 logo-image`}>
        <Image
          src={isSidebarOpen ? logo : shortLogo}
          alt='Image'
          width={isSidebarOpen ? '120' : '50'}
        />
      </div>
      <Menu
        model={items}
        className='w-full border-noround overflow-auto border-none'
      />
    </div>
  );
}
