export interface Province {
  StateID: number;
  StateName_vi: string;
}

export interface District {
  DistrictID: number;
  DistrictName_vi: string;
}

export interface Ward {
  WardID: number;
  WardName_vi: string;
}

export type FileType = {
  key: string;
  type: string;
  value: string;
};

export type LocationType = {
  forestOwnerId: string;
  companyId: string;
  area: string;
  startMining: string;
  endMining: string;
  details: string;
  inCharge: string;
  files: FileType[];
};

export type UserType = {
  user: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  represent: string;
  position: string;
  details: string;
};

export type CompanyType = {
  name: string;
  code: string;
  phone: string;
  represent: string;
  position: string;
  province: string;
  district: string;
  commune: string;
  details: string;
  note?: string;
};

export type QueryType = {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: string;
  type?: string;
};

export type AdminType = {
  miningId?: string;
  contractId?: string;
  error?: string;
};

export type DowloadDoc = {
  miningId?: string;
  type?: string;
  parts?: number;
};

export type Verify= {
  miningId: string;
  isVerify: boolean;
};

export type Paid = {
  miningId: string;
  isPaid: boolean;
  paidDate: string;
};

export interface Address {
  commune: string;
  details: string;
  district: string;
  province: string;
}

export interface ForestOwner {
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  issueDate:string;
}

export interface Company {
  name: string;
  code: string;
  address: string;
  represent: string;
  position: string;
  phone: string;
  email: string | null;
}

export interface Wood {
  name: string;
  quantity: number;
  avgDiameter: number;
  avgHeight: number;
  weight: number;
  note: string;
  unit: string;
  species: string;
}

export interface MiningInfoData {
  address: Address;
  area: number;
  startMining: string;
  endMining: string;
  contractDate: string;
  startDelivery: string;
  endDelivery: string;
  addendumDate: string;
  manifestDate: string;
  isPaid: boolean;
  isVerify: boolean;
  forestDistrict: string;
  totalQuantity: number;
  index: number;
  forestOwner: ForestOwner;
  company: Company;
  woods: Wood[];
  currentYear: number;
  forestOwnerAddress: string;
  miningAddress: string;
}

export interface ApiResponse {
  success: boolean;
  result: MiningInfoData;
}

export type LogItem = {
  id: string;
  userId: string;
  action: string | null;
  type: string;
  message: string;
  time: string;
  objectId: string;
};

export type LogResult = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: LogItem[];
};

export type LogResponse = {
  success: boolean;
  result: LogResult;
};
