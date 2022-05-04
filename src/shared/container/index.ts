import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { CoursesRepository } from '@modules/courses/infra/prisma/repositories/CoursesRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { KnowledgeAreaRepository } from '@modules/knowledgeArea/infra/prisma/repositories/KnowledgeAreaRepository';
import { IKnowledgeAreaRepository } from '@modules/knowledgeArea/repositories/IKnowledgeAreaRepository';
import { MonographsRepository } from '@modules/monographs/infra/prisma/repositories/MonographsRepository';
import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IMonographsRepository>(
  'MonographsRepository',
  MonographsRepository,
);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);

container.registerSingleton<IKnowledgeAreaRepository>(
  'KnowledgeAreaRepository',
  KnowledgeAreaRepository,
);
