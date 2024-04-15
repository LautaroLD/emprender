import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/user/user.entity';
import { Category } from 'src/modules/category/category.entity';
import { Business } from 'src/modules/business/business.entity';
import { Expense } from 'src/modules/expense/expense.entity';
import { Earning } from 'src/modules/earning/earning.entity';
import { Catalog } from 'src/modules/catalog/catalog.entity';
import { Product } from 'src/modules/product/product.entity';

const config = new ConfigService();
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: config.get('DB_DIALECT'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
      });

      sequelize.addModels([
        User,
        Category,
        Business,
        Expense,
        Earning,
        Catalog,
        Product,
      ]);

      User.hasMany(Business, { foreignKey: 'user_id' });
      Business.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

      Category.hasMany(Business, { foreignKey: 'category_id' });
      Business.belongsTo(Category, {
        foreignKey: 'category_id',
        as: 'category',
      });

      Business.hasMany(Expense, { foreignKey: 'business_id' });
      Expense.belongsTo(Business, {
        foreignKey: 'business_id',
        as: 'business',
      });

      Business.hasMany(Earning, { foreignKey: 'business_id' });
      Earning.belongsTo(Business, {
        foreignKey: 'business_id',
        as: 'business',
      });

      Business.hasMany(Catalog, { foreignKey: 'business_id' });
      Catalog.belongsTo(Business, {
        foreignKey: 'business_id',
        as: 'business',
      });

      Business.hasMany(Product, { foreignKey: 'business_id' });
      Product.belongsTo(Business, {
        foreignKey: 'business_id',
        as: 'business',
      });

      Catalog.belongsToMany(Product, {
        through: 'CatalogProduct',
        foreignKey: 'Catalog_id',
        otherKey: 'product_id',
        as: 'product',
      });

      Product.belongsToMany(Catalog, {
        through: 'CatalogProduct',
        foreignKey: 'product_id',
        otherKey: 'Catalog_id',
        as: 'Catalog',
      });

      await sequelize.sync();
      return sequelize;
    },
  },
];
