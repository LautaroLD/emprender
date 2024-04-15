import { Catalog } from './catalog.entity';

export const catalogProviders = [
  {
    provide: 'CATALOG_REPOSITORY',
    useValue: Catalog,
  },
];
