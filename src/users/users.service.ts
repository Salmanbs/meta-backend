import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async insertUser(createUserDto: CreateUserDto) {
    const {username, password} = createUserDto
    const lowerCaseUserName = username.toLowerCase();

    
    //Check if user already exists
    const checkUser = this.getUser(lowerCaseUserName);
    if(checkUser){
        return {
        msg: 'User already exists',
     } 
    }

    // Hash the password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
 
    const newUser = new this.userModel({ username, password: hashedPassword });

    await newUser.save();
    return {
        msg: 'User successfully registered',
        userId: newUser.id,
        userName: newUser.username
      };

  }


  async getUser(username:string){
    const lowerCaseUserName = username.toLowerCase();
    const user = await this.userModel.findOne({username: lowerCaseUserName})
    return user
  }
}
