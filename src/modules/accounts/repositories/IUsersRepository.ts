import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateUserPassword(userUpdated: User): Promise<User>;
}

export { IUsersRepository };
