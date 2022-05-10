import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
@Injectable()
export class BooksService {
  //data source
  private books: any[] = [];
  getAllBooks(filter: FilterBookDto): any[] {
    const { title, author, category, max_year, min_year } = filter;
    return this.books;
  }

  getBook(id: string) {
    const bookIdx = this.findBookById(id);
    return this.books;
  }

  //   createBook(title: string, author: string, category: string) {
  //     this.books.push({
  //       id: uuidv4(),
  //       title,
  //       author,
  //       category,
  //     });

  //     return {
  //       message: 'Book created successfully',
  //     };
  //   }

  createBook(CreateBookDto: CreateBookDto) {
    const { title, author, category, year } = CreateBookDto;
    this.books.push({
      id: uuidv4(),
      title,
      author,
      category,
      year,
    });

    return {
      message: 'Book created successfully',
    };
  }
  updateBook(id: string, title: string, author: string, category: string) {
    const bookIdx = this.findBookById(id);
    this.books[bookIdx].title = title;
    this.books[bookIdx].author = author;
    this.books[bookIdx].category = category;
    return { message: 'update success' };
  }
  findBookById(id: string) {
    const bookIdx = this.books.findIndex((book) => book.id === id);
    if (bookIdx === -1) {
      throw new NotFoundException('buku tidak ditemukan');
    }

    return bookIdx;
  }
}
