import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entity/users.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: String;
  @Column()
  title: string;
  @Column()
  author: string;
  @Column()
  category: string;
  @Column()
  year: number;
  @ManyToOne(()=> User, user => user.books)
  user: User;
}
