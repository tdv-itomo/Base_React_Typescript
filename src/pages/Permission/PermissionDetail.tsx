import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { ItemType, PermissionType } from '../../models/Permission';
import { useDispatch } from 'react-redux';
import { updatePermission } from '../../store/Permission/slice';

type PermissionDetailProps = {
  selectedGroup: PermissionType | null;
};

export const PermissionDetail: React.FC<PermissionDetailProps> = React.memo(
  ({ selectedGroup }) => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
      {}
    );
    const dispatch = useDispatch();

    useEffect(() => {
      if (selectedGroup) {
        const initialCheckedItems: Record<string, boolean> = {};
        Object.keys(selectedGroup.roles).forEach((key) => {
          selectedGroup.roles[key].forEach((item: ItemType) => {
            initialCheckedItems[item.id.toString()] = item.check;
          });
          initialCheckedItems[key] = selectedGroup.roles[key].every(
            (item) => item.check
          );
        });
        setCheckedItems(initialCheckedItems);
      }
    }, [selectedGroup]);

    const handleParentCheck = (parentKey: string) => {
      const updatedCheckedItems = { ...checkedItems };
      const isChecked = !updatedCheckedItems[parentKey];
      updatedCheckedItems[parentKey] = isChecked;
      selectedGroup?.roles[parentKey]?.forEach((item: ItemType) => {
        updatedCheckedItems[item.id.toString()] = isChecked;
      });
      setCheckedItems(updatedCheckedItems);
    };

    const handleChildCheck = (childKey: string, parentKey: string) => {
      const updatedCheckedItems = { ...checkedItems };
      updatedCheckedItems[childKey] = !checkedItems[childKey];
      const allChildrenChecked =
        selectedGroup?.roles[parentKey]?.every(
          (item: ItemType) => updatedCheckedItems[item.id.toString()]
        ) ?? false;

      updatedCheckedItems[parentKey] = allChildrenChecked;
      setCheckedItems(updatedCheckedItems);
    };

    const getSelectedChildIds = (
      selectedGroup: PermissionType | null,
      checkedItems: Record<string, boolean>
    ): number[] => {
      if (!selectedGroup) return [];
      const selectedChildIds: number[] = [];
      Object.keys(selectedGroup.roles).forEach((parentKey) => {
        selectedGroup.roles[parentKey].forEach((item: ItemType) => {
          if (checkedItems[item.id.toString()]) {
            selectedChildIds.push(item.id);
          }
        });
      });
      return selectedChildIds;
    };

    const updatePermissions = () => {
      const selectedChildIds = getSelectedChildIds(selectedGroup, checkedItems);
      if (selectedGroup) {
        dispatch(
          updatePermission({
            id: selectedGroup.id,
            data: { list: selectedChildIds },
          })
        );
      }
    };

    return (
      <div className='bg-white border-round-xl shadow-1 p-3 flex flex-column lg:w-9'>
        <div className='flex justify-content-between align-items-center flex-wrap mb-2'>
          <h3>Phân quyền</h3>
          <Button
            label='Lưu'
            onClick={updatePermissions}
            style={{ height: '30px', width: '100px' }}
            className='border-round-xl'
          />
        </div>
        <div className='border-1 border-primary px-5 flex flex-column sm:flex-row sm:justify-content-between border-round-xl'>
          {selectedGroup &&
            Object.keys(selectedGroup.roles)?.map((key) => (
              <div
                key={key}
                className='w-6 my-3'>
                <div className='font-bold mb-3 text-primary flex align-items-center'>
                  <Checkbox
                    checked={checkedItems[key] === true}
                    onChange={() => handleParentCheck(key)}
                    inputId={key}
                  />
                  <label
                    htmlFor={key}
                    className='ml-2 cursor-pointer'>
                    {key}
                  </label>
                </div>
                {selectedGroup.roles[key]?.map((item: ItemType) => (
                  <div
                    key={item.id}
                    className='my-2 flex align-items-center'>
                    <Checkbox
                      inputId={item.id.toString()}
                      checked={checkedItems[item.id.toString()]}
                      onChange={() => handleChildCheck(item.id.toString(), key)}
                    />
                    <label
                      className='ml-2 cursor-pointer'
                      htmlFor={item.id.toString()}>
                      {item.value}
                    </label>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
);
