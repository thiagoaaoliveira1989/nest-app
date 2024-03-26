import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Music } from './entities/music.entity';

@ApiTags('Music')
@Controller('api/music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('/register')
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() payload: CreateMusicDto,
    @Request() req,
  ): Promise<Music> {
    return await this.musicService.create(payload, req.user.id);
  }

  @Get()
  public async findAll(): Promise<Music[]> {
    return await this.musicService.findAll();
  }

  @Get(':musicId')
  public async findOne(@Param('musicId') musicId: string): Promise<Music> {
    return await this.musicService.findOne(musicId);
  }
}
