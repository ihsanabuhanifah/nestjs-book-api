import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { FilterBookDto } from '../dto/filter-book.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../../users/entity/users.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(user: User, filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;
    console.log('user' , user);
    
    const query = this.createQueryBuilder('book').where('book.user = :userId', {
      userId: user.id,
    });
    if (title) {
      query.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }
    if (author) {
      query.andWhere('book.author LIKE :author', { author: `%${author}%` });
    }
    if (category) {
      query.andWhere('book.category LIKE :category', {
        category: `%${category}%`,
      });
    }

    if (min_year) {
      query.andWhere('book.year >= :min_year', { min_year });
    }

    if (max_year) {
      query.andWhere('book.year <= :max_year', { max_year });
    }

    return await query.getMany();
  }

  async createBook(user:User, CreateBookDto: CreateBookDto): Promise<void> {
    const { title, author, category, year } = CreateBookDto;
    const book = this.create();
    book.title = title;
    book.user = user;
    book.author = author;
    (book.category = category), (book.year = year);
    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
