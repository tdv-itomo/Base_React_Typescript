export type IProvince = {
  StateID: number;
  StateName_vi: string;
};

export interface IDistrict {
  DistrictID: number;
  DistrictName_vi: string;
}

export interface IWard {
  WardID: number;
  WardName_vi: string;
}

export interface IAddress {
  details: string | '';
  commune: string | null;
  district: string | null;
  province: string | null;
}
