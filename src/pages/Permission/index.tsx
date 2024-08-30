import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useRef, useState } from 'react';
import './permission.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  clearDataPermission,
  getPermissions,
} from '../../store/Permission/slice';
import { RootState } from '../../store';
import { PermissionType } from '../../models/Permission';
import { PermissionDetail } from './PermissionDetail';
import { Toast } from 'primereact/toast';

const Permissions = () => {
  const [selectedGroup, setSelectedGroup] = useState<PermissionType | null>(
    null
  );

  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();

  const { permissions, updateSuccess, updateFail } = useSelector(
    (state: RootState) => ({
      permissions: state.Permission.permissions.data,
      updateSuccess: state.Permission.updatePermission.data,
      updateFail: state.Permission.updatePermission.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (updateSuccess) {
      toast.current?.show({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Cập nhật quyền thành công',
        life: 3000,
      });
      dispatch(clearDataPermission());
    }
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    if (updateFail) {
      toast.current?.show({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Cập nhật quyền thất bại',
        life: 3000,
      });
    }
  }, [updateFail]);

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      setSelectedGroup(permissions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions?.length]);

  useEffect(() => {
    dispatch(getPermissions({ page: 1, limit: 10 }));
  }, [dispatch, selectedGroup]);

  return (
    <>
      <Toast ref={toast} />
      <div className='flex flex-column lg:flex-row gap-3'>
        <div
          className='bg-white border-round-xl shadow-1 p-3 flex flex-column gap-2 lg:w-3'
          style={{ minWidth: '300px' }}>
          <div className='flex justify-content-between align-items-center mb-2'>
            <h3>Bộ phận</h3>
          </div>
          <div className='border-1 border-round-xl border-primary'>
            <DataTable
              value={permissions || []}
              onRowClick={(e) => setSelectedGroup(e.data as PermissionType)}
              selection={selectedGroup}
              selectionMode='single'
              showHeaders={false}
              emptyMessage='Chưa có nhóm quyền'
              scrollable
              scrollHeight='600px'
              pt={{
                root: { className: 'custom-table' },
              }}
              className='overflow-hidden border-round-xl'>
              <Column
                field='stt'
                style={{ width: '50px', height: '40px' }}
                align={'center'}
                body={(_rowData, { rowIndex }) => <span>{rowIndex + 1}</span>}
              />
              <Column
                field='name'
                style={{ minWidth: '200px', height: '40px' }}
              />
            </DataTable>
          </div>
        </div>
        <PermissionDetail selectedGroup={selectedGroup} />
      </div>
    </>
  );
};

export default Permissions;
