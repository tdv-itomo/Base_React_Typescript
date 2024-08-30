import { District, Province, Ward } from './Data';
import { PermissionType } from './Permission';

export interface AddressProps {
  formik: any;
  provinces: Province[] | undefined;
  districts: District[];
  wards: Ward[];
  permissions?: PermissionType[] | null;
  type?: string;
}
