import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { BusinessModule } from './modules/business/business.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { EarningModule } from './modules/earning/earning.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    BusinessModule,
    ExpenseModule,
    EarningModule,
    CatalogModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
