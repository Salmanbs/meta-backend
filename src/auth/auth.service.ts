import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) { }

    async validateUser(username: string,password:string): Promise<any> {
        const lowerCaseUserName = username.toLowerCase();

        const user = await this.usersService.getUser(lowerCaseUserName)
        const validPassword = bcrypt.compare(password, user.password)

        if(!user){
            throw new NotAcceptableException(' User not found')
        }
        if(!validPassword){
            throw new UnauthorizedException(' Unauthorized')
        }

        if(user && validPassword){
            return {
                userId: user.id,
                username: user.username,
            }
        }
        return null

    }
}
