import { Business } from './business.entity';

export const businessProviders = [
  {
    provide: 'BUSINESS_REPOSITORY',
    useValue: Business,
  },
];
