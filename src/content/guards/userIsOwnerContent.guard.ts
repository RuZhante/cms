import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ContentService } from '../content.service';

@Injectable()
export class UserIsOwnerContentGuard implements CanActivate {
  constructor(private readonly contentService: ContentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const contentId = request.params.id;
    const currentUserId = request.user.id;

    const currentContent = await this.contentService.findOne(contentId);

    if (currentUserId === currentContent.userId) return true;

    throw new HttpException('Forbidden resource!', HttpStatus.FORBIDDEN);
  }
}
