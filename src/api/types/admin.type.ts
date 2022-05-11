export interface CreateAdminDto {
    level: number;
    permission: string;
    name: string;
    account: string;
    password: string;
  }
export interface UpdateAdminDto {
    level?: number;
    permission?: string;
    name?: string;
    password?: string;
  }
export interface IAdmin {
    id: string;
    level: number;
    permission: string;
    name: string;
    account: string;
  }
