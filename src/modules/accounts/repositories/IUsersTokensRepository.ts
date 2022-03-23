import { Users_Token } from '@prisma/client';

import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<Users_Token>;

  findByUserAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<Users_Token>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<Users_Token>;

  findByUserId(user_id: string): Promise<Users_Token>;
}

export { IUsersTokensRepository };
