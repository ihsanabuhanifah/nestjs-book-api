import { User } from 'src/users/entity/users.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  IsRevoked: boolean;
  @Column()
  expiredAt: Date;
  @ManyToOne(()=> User, (user)=> user.refreshTokens)
  user:User;
}
