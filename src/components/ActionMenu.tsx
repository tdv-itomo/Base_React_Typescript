import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faFileLines,
  faFilePen,
  faRightLeft,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primereact/menuitem';
const ActionMenu = ({
  onEdit,
  onDelete,
  onApprove,
  onRefund,
  showProfile,
  type,
}: {
  onEdit: () => void;
  onDelete: () => void;
  showProfile?: () => void;
  onApprove?: () => void;
  onRefund?: () => void;
  type?: string;
}) => {
  const menuAction = useRef<Menu>(null);

  const actions: MenuItem[] = [{ template: () => <></> }];

  if (type === 'device') {
    actions.push({
      label: 'Hồ sơ thiết bị',
      icon: (
        <FontAwesomeIcon
          icon={faFileLines}
          className='text-blue-500 mr-4'
        />
      ),
      command: showProfile,
    });
  }

  if (type === 'delivery') {
    actions.push({
      label: 'Duyệt',
      icon: (
        <FontAwesomeIcon
          icon={faCircleCheck}
          className='text-primary mr-3'
        />
      ),
      command: onApprove,
    });
    actions.push({
      label: 'Hoàn trả',
      icon: (
        <FontAwesomeIcon
          icon={faRightLeft}
          className='text-blue-500 mr-3'
        />
      ),
      command: onRefund,
    });
  }

  actions.push({
    label: 'Chỉnh sửa',
    icon: (
      <FontAwesomeIcon
        icon={faFilePen}
        className='mr-3'
        style={{ color: 'rgb(255, 84, 0)' }}
        // size='lg'
      />
    ),
    command: onEdit,
  });

  actions.push({
    label: 'Xóa',
    icon: (
      <FontAwesomeIcon
        icon={faTrashCan}
        className='text-red-500'
        style={{ marginRight: '1.3rem' }}
        // size='lg'
      />
    ),
    command: onDelete,
  });

  return (
    <div className='flex justify-content-end align-items-center'>
      <Menu
        model={actions}
        popup
        ref={menuAction}
        className='action-menu border-round-xl w-auto p-0'
        pt={{ menu: { className: 'border-round-xl overflow-hidden' } }}
        style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
      />
      <Button
        icon='pi pi-ellipsis-v'
        onClick={(e) => menuAction.current?.toggle(e)}
        className='p-button-text'
        rounded
      />
    </div>
  );
};

export default ActionMenu;
