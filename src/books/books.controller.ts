import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Controller('books')
export class BooksController {
  //   @Get('/:name')
  //   hello(@Param('name') name: string) {
  //     return `Hello ${name}`;
  //   }

  //   @Post()
  //   createBook(@Body('name') name: string) {
  //     return name;
  //   }

  //   private booksService: BooksService;
  //   constructor(booksService: BooksService) {
  //     this.booksService = booksService;
  //   }

  constructor(private booksService: BooksService) {}
  @Get()
  getAllBooks(@Query() filter:FilterBookDto) {
    return this.booksService.getAllBooks(filter);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Post()
  //   createBook(
  //     @Body('title') title: string,
  //     @Body('author') author: string,
  //     @Body('category') category: string,
  //   ) {
  //     return this.booksService.createBook(title, author, category);
  //   }
  @UsePipes(ValidationPipe)
  createBook(@Body() payload: CreateBookDto) {
    return this.booksService.createBook(payload);
  }
  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('category') category: string,
  ) {
    return this.booksService.updateBook(id, title, author, category);
  }
}
