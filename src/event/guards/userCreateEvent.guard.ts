import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class UserCreateEventGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userInParamsId = request.params.userId;
    const currentUserId = request.user.id;

    if (userInParamsId === currentUserId) return true;

    throw new UnprocessableEntityException(
      'Current User is not equal with User in params',
    );
  }
}
