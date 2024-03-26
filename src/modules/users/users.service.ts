import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUSerDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUSerDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async create(payload: CreateUSerDto): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!foundUser) {
      const user = new User();
      Object.assign(user, payload);
      await this.prisma.user.create({
        data: user,
      });
      return plainToInstance(User, user);
    }

    throw new ConflictException('User already exists!');
  }

  public async findAll(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany();
    return plainToInstance(User, allUsers);
  }
  public async findOne(userId: string): Promise<User | undefined> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new ConflictException('User not found!');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return plainToInstance(User, user);
  }

  public async update(userId: string, payload: UpdateUSerDto): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new ConflictException('User not found!');
    }

    const userUpdate = await this.prisma.user.update({
      where: { id: userId },
      data: payload,
    });

    return plainToInstance(User, userUpdate);
  }

  public async delete(userId: string): Promise<void> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new ConflictException('User not found!');
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
