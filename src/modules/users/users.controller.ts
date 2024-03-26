import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUSerDto } from './DTO/create-user.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUSerDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly service: UserService) { }

  @HttpCode(201)
  @Post('/register')
  public async create(@Body() payload: CreateUSerDto): Promise<User> {
    return await this.service.create(payload);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('userId') userId: string): Promise<User> {
    return await this.service.findOne(userId);
  }

  @Patch(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('userId') userId: string,
    @Body() payload: UpdateUSerDto,
  ): Promise<User> {
    return await this.service.update(userId, payload);
  }
  @HttpCode(204)
  @Delete(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('userId') userId: string): Promise<void> {
    await this.service.delete(userId);
  }
}
