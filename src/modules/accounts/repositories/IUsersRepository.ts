import { User } from '@prisma/client';

import { IAdvisorResponseDTO } from '../dtos/IAdvisorResponseDTO';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByConfirmedEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateUser(userUpdated: User): Promise<User>;
  showAll(page?: number): Promise<IUserResponseDTO>;
  showAllAdvisors(): Promise<IAdvisorResponseDTO[]>;
  delete(email: string): Promise<void>;
  findWithoutConfirmEmail(id: string): Promise<User>;
  findAllByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
