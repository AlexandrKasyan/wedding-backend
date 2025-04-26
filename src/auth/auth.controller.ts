import { Controller, Request, Post, UseGuards, Body, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body('password') password: string) {
    const admin = await this.authService.validateAdmin(password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return this.authService.login(admin);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  async isAuth(){
    return true;
  }
}
