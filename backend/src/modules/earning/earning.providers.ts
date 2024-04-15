import { Earning } from './earning.entity';

export const earningProviders = [
  {
    provide: 'EARNING_REPOSITORY',
    useValue: Earning,
  },
];
