import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @ApiProperty(/*{
    description: "User email to login",
    default: "example@mail.com",
    type: String,
  } */)
  public email: string;

  @IsString()
  @ApiProperty()
  public password: string;
}
