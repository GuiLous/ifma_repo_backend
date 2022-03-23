import { v4 as uuidV4 } from 'uuid';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@prisma/client';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, password, fullName }: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: uuidV4(),
      email,
      password,
      fullName,
      isAdmin: false,
      isAdvisor: false,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async updateUserPassword(userUpdated: User): Promise<User> {
    const userIndex = this.users.findIndex(
      user => user.email === userUpdated.email,
    );

    this.users[userIndex] = userUpdated;

    return this.users[userIndex];
  }
}

export { UsersRepositoryInMemory };

// async function main() {
//   const f = new UsersRepositoryInMemory();

//   const c = await f.create({
//     email: 'safu@lotfabnic.it',
//     fullName: 'Emilie Graves',
//     password: '123',
//   });

//   const d = { ...c, fullName: 'assss' };
//   const r = await f.updateUserPassword(d);
// }

// main();
