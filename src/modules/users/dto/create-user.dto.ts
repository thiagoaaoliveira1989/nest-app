import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUSerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  @Transform(({ value }) => hashSync(value, 10), {
    groups: ['hashPassword'],
  })
  public password: string;
}
