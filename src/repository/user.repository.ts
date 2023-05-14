import { User } from 'src/entity';

export const userRepository = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
