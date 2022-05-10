import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/typeorm.config';



@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig) ,AuthModule, BooksModule],
 
})
export class AppModule {}
