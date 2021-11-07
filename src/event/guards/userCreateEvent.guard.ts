import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserCreateEventGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // console.log(request);

    const userInParamsId = Number(request.params.userId);
    const currentUserId = request.user.id;

    if (userInParamsId === currentUserId) return true;

    throw new HttpException(
      'Current User is not equal with User in params',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
