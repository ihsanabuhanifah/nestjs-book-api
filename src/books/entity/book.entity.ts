import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
