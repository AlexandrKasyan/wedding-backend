import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Секретный ключ для подписи JWT
    });
  }

  async validate(payload: any) {
    // В payload находится информация, которую мы поместили при создании JWT (в AuthService.login)
    // Здесь можно добавить логику для проверки, существует ли пользователь с таким ID, и т.д.
    return { userId: payload.sub }; // Возвращаем объект, который будет доступен в `req.user`
  }
}
