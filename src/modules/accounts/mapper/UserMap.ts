import { instanceToInstance } from 'class-transformer';

import { User } from '@prisma/client';

import { IUsers } from '../dtos/IUserResponseDTO';

class UserMap {
  static toDTO({
    id,
    email,
    fullName,
    isAdmin,
    isAdvisor,
    created_at,
  }: User): IUsers {
    const user = instanceToInstance({
      id,
      email,
      fullName,
      isAdmin,
      isAdvisor,
      created_at,
    });

    return user;
  }
}

export { UserMap };
