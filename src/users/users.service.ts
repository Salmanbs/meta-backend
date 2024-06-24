import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async insertUser(userName: string, password: string) {
    const username = userName.toLowerCase();
    const newUser = new this.userModel({ username, password });
    await newUser.save();
    return newUser;
  }
}