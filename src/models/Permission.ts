export type PermissionType = {
  id: string;
  name: string;
  roles: {
    [key: string]: ItemType[];
  };
};

export type ItemType = {
  id: number;
  value: string;
  check: boolean;
};
