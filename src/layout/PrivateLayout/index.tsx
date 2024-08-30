import React, { useState } from 'react';
import Header from './Header';
import SidebarMenu from './SidebarMenu';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <div className='h-screen w-screen flex flex-row surface-200'>
      <div className='hidden xl:flex bg-white'>
        <SidebarMenu setMobileMenuVisible={() => {}} />
      </div>
      <div className='flex flex-column h-screen overflow-hidden flex-auto w-full'>
        <div>
          <Header />
        </div>
        <div className='overflow-auto p-3'>{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
