import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { Music } from './entities/music.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MusicService {
  constructor(private prisma: PrismaService) {}

  public async create(payload: CreateMusicDto, userId: string): Promise<Music> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new ConflictException('User not found!');
    }

    const music = { ...payload, userId };
    const { user, ...musicData } = Object.assign(new Music(), music);

    Object.assign(music, payload);
    const newMusic = await this.prisma.music.create({
      data: musicData,
      include: { user: true },
    });

    return plainToInstance(Music, newMusic);
  }

  public async findAll(): Promise<Array<Music>> {
    const allMusics = await this.prisma.music.findMany({
      include: { user: true },
    });
    return plainToInstance(Music, allMusics);
  }

  public async findOne(musicId: string): Promise<Music> {
    const foundMusic = await this.prisma.music.findFirst({
      where: { id: musicId },
      include: { user: true },
    });

    if (!foundMusic) {
      throw new NotFoundException('Music not found');
    }

    return plainToInstance(Music, foundMusic);
  }
}
