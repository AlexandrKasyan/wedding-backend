import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateAdmin(password: string): Promise<any> {
    // Здесь должна быть логика проверки пароля администратора.
    // В реальном приложении пароль должен храниться в захешированном виде в базе данных или в env файле.
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH; // Получаем хеш пароля из переменной окружения
    if (!hashedPassword) {
      console.error("ADMIN_PASSWORD_HASH is not set in environment variables.");
      return null; // Или выбрось исключение
    }

    const passwordValid = await bcrypt.compare(password, hashedPassword);

    if (passwordValid) {
      return { sub: 'admin' }; // Payload для JWT (в данном случае, просто указание, что это админ)
    }
    return null;
  }

  async login(admin: any) {
    if (!admin) {
      throw new UnauthorizedException();
    }
    const payload = { sub: admin.sub };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
