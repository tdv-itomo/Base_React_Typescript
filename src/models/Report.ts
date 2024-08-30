export interface IWood {
  name: string;
  weight: number;
}

export interface IMenu {
  name: string;
  count: number;
}

export interface IProfile {
  id: string;
  address: string;
  forestOwner: string;
  company: string;
  manifestDate: string | Date;
  woods: IWood[] | [];
  isPaid: boolean;
  isVerify: boolean;
}

export interface IReport {
  success: true;
  result: {
    menu: IMenu[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    items: IProfile[];
  };
}
