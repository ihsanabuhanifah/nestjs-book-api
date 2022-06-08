import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UUIDValidationPipe } from 'src/pipes/uuid.validation';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/book.entity';
import { GetUser } from './repository/get.user.decorator';
import { User } from 'src/users/entity/users.entity';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('books')
@UseGuards(JwtGuard)
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  async getBooks(@Query() filter: FilterBookDto, @GetUser() user:User): Promise<Book[]> {
  
    return this.booksService.getBooks(user, filter);
  }
  @Get('/:id')
  async getBookById(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Book> {
    return this.booksService.getBookById(id);
  }
  @Post()
  async createBook(@GetUser() user:User, @Body() payload: CreateBookDto): Promise<void> {
    return this.booksService.createBook(user, payload);
  }
  @Put('/:id')
  async updateBook(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: CreateBookDto,
  ): Promise<void> {
    return this.booksService.updateBook(id, payload);
  }

  @Delete('/:id')
  async deleteBook(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
