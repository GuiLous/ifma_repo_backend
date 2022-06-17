export interface IUsers {
  id: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  isAdvisor: boolean;
  created_at: Date;
}

interface IUserResponseDTO {
  total_count: number;
  users: IUsers[];
}

export { IUserResponseDTO };
