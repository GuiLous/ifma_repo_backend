interface IUserResponseDTO {
  id: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  isAdvisor: boolean;
  created_at: Date;
}
export { IUserResponseDTO };
