import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/books/repository/get.user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { LoginResponse } from './interface/login-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshAccessTokenDto);
  }

@Post(':id/revoke')
@UseGuards(JwtGuard)
async revokeRefreshToken(@Param('id') id:string) : Promise<void>{
  return this.authService.revokeRefreshToken(id)
}
  
}
