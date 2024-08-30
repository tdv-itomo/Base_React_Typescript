import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { District, Province, Ward } from '../models/Data';

interface AddressProps {
  formik: any;
  provinces: Province[] | undefined;
  districts: District[];
  wards: Ward[];
}

export const Address: React.FC<AddressProps> = ({
  formik,
  provinces,
  districts,
  wards,
}) => {
  return (
    <div className='flex flex-column w-12'>
      <label className='mb-2'>Địa chỉ</label>
      <div className='flex gap-2 mb-3 w-full'>
        <div className='flex flex-column w-4 '>
          <Dropdown
            id='province'
            value={formik.values.province}
            options={provinces?.map((p) => ({
              label: p.StateName_vi,
              id: p.StateID,
            }))}
            optionLabel='label'
            optionValue='id'
            emptyMessage='Không có dữ liệu'
            filter
            onChange={formik.handleChange}
            className='border-round-xl'
            placeholder='Tỉnh / Thành phố'
            invalid={
              formik.touched.province && formik.errors.province ? true : false
            }
          />
          {formik.touched.province && formik.errors.province ? (
            <div style={{ color: 'red' }}>
              {formik.errors.province.toString()}
            </div>
          ) : null}
        </div>
        <div className='flex flex-column  w-4'>
          <Dropdown
            id='district'
            value={formik.values.district}
            options={districts.map((d) => ({
              label: d.DistrictName_vi,
              id: d.DistrictID,
            }))}
            optionLabel='label'
            optionValue='id'
            emptyMessage='Không có dữ liệu'
            onChange={formik.handleChange}
            className=' border-round-xl'
            placeholder='Quận / Huyện'
            filter
            invalid={
              formik.touched.district && formik.errors.district ? true : false
            }
          />
          {formik.touched.district && formik.errors.district ? (
            <div style={{ color: 'red' }}>
              {formik.errors.district.toString()}
            </div>
          ) : null}
        </div>
        <div className='flex flex-column w-4 '>
          <Dropdown
            id='commune'
            emptyMessage='Không có dữ liệu'
            value={formik.values.commune}
            onChange={formik.handleChange}
            options={wards.map((w) => ({
              label: w.WardName_vi,
              id: w.WardID,
            }))}
            filter
            optionLabel='label'
            optionValue='id'
            className='border-round-xl'
            placeholder='Phường / Xã'
            invalid={
              formik.touched.commune && formik.errors.commune ? true : false
            }
          />
          {formik.touched.commune && formik.errors.commune ? (
            <div style={{ color: 'red' }}>
              {formik.errors.commune.toString()}
            </div>
          ) : null}
        </div>
      </div>
      <InputText
        id='details'
        name='details'
        value={formik.values.details}
        onChange={formik.handleChange}
        className='w-full border-round-xl'
        placeholder='Số nhà, thôn, xóm...'
        invalid={formik.touched.details && formik.errors.details ? true : false}
      />
      {formik.touched.details && formik.errors.details ? (
        <div style={{ color: 'red' }}>{formik.errors.details.toString()}</div>
      ) : null}
    </div>
  );
};
