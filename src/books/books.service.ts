import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { BookRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';
import { async } from 'rxjs';
@Injectable()
export class BooksService {
  //data source
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(filter);
  }

  async createBook(CreateBookDto: CreateBookDto): Promise<void> {
    await this.bookRepository.createBook(CreateBookDto);
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async updateBook(id: string, CreateBookDto) {
    const { title, author, category, year } = CreateBookDto;
    const book = await this.getBookById(id);
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;
    await book.save();
  }

  async deleteBook(id: string): Promise<void> {
    const result = await this.bookRepository.delete(id);
    console.log(result);
    if(result.affected === 0){
        throw new NotFoundException(`Book with id ${id} not found`);
    }
  
   
  }
}
