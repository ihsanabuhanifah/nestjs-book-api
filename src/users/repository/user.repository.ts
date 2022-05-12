import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/users.entity';
import * as bycrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async CreateUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;
    const user = this.create();
    user.name = name;
    user.email = email;

    user.salt = await bycrypt.genSalt();
    user.password = await bycrypt.hash(password, user.salt);
    try {
      await user.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    return await query.getMany();
  }

  async validateUser(email:string, password:string) : Promise<User>{
    const user = await this.findOne({email})
    if(user && (await user.validatePassword(password))){
      return user
    }
    return null

  }
}
