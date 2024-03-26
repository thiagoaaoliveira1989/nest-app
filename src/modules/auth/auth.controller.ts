import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('Session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  public async login(
    @Body() payload: CreateTokenDto,
  ): Promise<{ token: string }> {
    return this.authService.login(payload);
  }
}
