import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create.user.dto";


@Injectable()
export class LocalSrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
      super();
    }
    async validate(username: string, password:string): Promise<any> {

      const user = await this.authService.validateUser(username,password);
  
      if (!user) {
        throw new UnauthorizedException();
      }
      return user; 
    }
}