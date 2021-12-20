import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { getRepository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_ISSUER_URL}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_ISSUER_URL}/`,
      algorithms: ['RS256'],
    });
  }

  // async validate(payload: any) {
  //   const userRepo = getRepository(UserEntity);
  //   const foundUser = userRepo.findOneOrFail({
  //     id: payload.sub,
  //     email: payload.email,
  //   });
  //   return foundUser;
  // }

  async validate(payload: any) {
    const userRepo = getRepository(UserEntity);
    const foundUser = await userRepo.findOne({ id: payload.sub });

    if (!foundUser) {
      const newUser = new UserEntity();
      newUser.id = payload.sub;
      return await userRepo.save(newUser);
    }

    const minimumScope = ['openid', 'profile', 'email'];

    if (
      payload?.scope
        ?.split(' ')
        .filter((scope) => minimumScope.indexOf(scope) > -1).length !== 3
    ) {
      throw new UnauthorizedException(
        'JWT does not possess the required scope (`openid profile email`).',
      );
    }

    // console.log(payload);
    // console.log('-----------------');
    console.log(foundUser);

    return foundUser;
  }
}
