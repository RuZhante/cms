import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContentEntity } from './content.entity';
import { ContentService } from './content.service';
import { ContentParamsDto } from './dto/contentParams.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { FileInfoDto } from './dto/fileInfo.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { UserCreateEventScreenPlaylistContentGuard } from './guards/userCreate-Event-Screen-Playlist-Content.guard';
import { UserIsOwnerContentGuard } from './guards/userIsOwnerContent.guard';

@Crud({
  model: {
    type: ContentEntity,
  },

  dto: {
    create: CreateContentDto,
    replace: UpdateContentDto,
  },

  params: {
    userId: {
      field: 'userId',
      type: 'string',
    },
  },

  routes: {
    exclude: ['createManyBase', 'recoverOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [UseGuards(UserCreateEventScreenPlaylistContentGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(UserIsOwnerContentGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(UserIsOwnerContentGuard)],
    },
  },
})
@ApiTags('contents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users/:userId/contents')
export class ContentController implements CrudController<ContentEntity> {
  constructor(public service: ContentService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Post('by-params')
  async getContentWithParams(
    @Body() contentParamsDto: ContentParamsDto,
  ): Promise<ContentEntity[]> {
    const contents = await this.service.getContentsWithParams(
      contentParamsDto.orientation,
      contentParamsDto.screenResolution,
    );
    return contents;
  }

  // @Override('createOneBase')
  // @UseInterceptors(FileInterceptor('file'))
  // async addContent(
  //   @Body() createContentDto: CreateContentDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return await this.service.addContent(file.buffer, file.originalname);
  // }

  // @UseInterceptors(CrudRequestInterceptor)
  @Post('get-url')
  async getUrl(@Body() fileInfo: FileInfoDto) {
    return await this.service.uploadPublicContent(fileInfo);
  }
}
