import { Button } from 'primereact/button';
import React from 'react';

interface FooterFormProps {
  closeModal: () => void;
  handleSubmit: () => void;
}

export const FooterForm: React.FC<FooterFormProps> = ({
  closeModal,
  handleSubmit,
}) => {
  return (
    <div className='flex justify-content-between pt-4'>
      <Button
        label='Hủy'
        severity='secondary'
        className='border-round-xl'
        onClick={closeModal}
        style={{ height: '35px', minWidth: '80px' }}
      />
      <Button
        type='submit'
        label='Lưu'
        onClick={handleSubmit}
        className='p-button-primary border-round-xl'
        style={{ height: '35px', minWidth: '80px', margin: 0 }}
      />
    </div>
  );
};
