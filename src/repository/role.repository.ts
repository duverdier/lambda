import { Role } from '../entity/role.entity';

export const roleRepository = [
  {
    provide: 'ROLE_REPOSITORY',
    useValue: Role,
  },
];
