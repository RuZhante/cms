import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { UserService } from '../user.service';
import { SECRET } from 'src/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, SECRET);
      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch {
      req.user = null;
      next();
    }
  }
}
