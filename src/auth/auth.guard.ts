import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as  jwt from "jsonwebtoken"

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
      if (!req.headers.authorization){
          console.log('you are not auth') 
          return false
      }else{
          let token = req.headers.authorization
          try{
              jwt.verify(token,process.env.SECRET_KEY)
              console.log('Sukses')
              return true
          } catch(err){
            console.log('invalid token')
              return false
          }
      }
  }
}
