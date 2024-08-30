import React from 'react';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <div className='h-screen w-screen surface-100 flex justify-content-center align-items-center'>
      <div className='card bg-white border-round-xl'>{children}</div>
    </div>
  );
};

export default PublicLayout;
