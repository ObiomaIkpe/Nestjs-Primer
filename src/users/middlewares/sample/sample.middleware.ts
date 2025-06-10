import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers.authorization)
    console.log('example middleware!');
    const {authorization} = req.headers;

    if(!authorization){
      throw new HttpException('No Auth Token', HttpStatus.FORBIDDEN);
    }
    if (authorization === req.headers.authorization)
    next();

    else throw new HttpException('Invalid authorization token', HttpStatus.FORBIDDEN)
  }
}
