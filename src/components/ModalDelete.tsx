import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface ModelDeleteProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  accept: () => void;
  msg?: string;
}

export default function ModelDelete({
  visible,
  setVisible,
  accept,
  msg = 'Bạn chắc chắn muốn xóa mục này?',
}: ModelDeleteProps) {
  return (
    <>
      <ConfirmDialog
        visible={visible}
        content={() => (
          <div className='flex flex-column align-items-center p-5 surface-overlay border-round-xl'>
            <div className='border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8'>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                size='2xl'
              />
            </div>
            <span className='font-bold text-2xl block mb-2 mt-4'>Cảnh báo</span>
            <div className='mb-0'>{msg}</div>
            <div className='flex align-items-center gap-2 mt-4'>
              <Button
                label='Hủy'
                outlined
                severity='danger'
                onClick={() => setVisible(false)}
                className='w-8rem border-round-xl'
                style={{ height: '35px' }}></Button>
              <Button
                label='Đồng ý'
                onClick={accept}
                className='w-8rem border-round-xl'
                style={{ height: '35px' }}></Button>
            </div>
          </div>
        )}
      />
    </>
  );
}
