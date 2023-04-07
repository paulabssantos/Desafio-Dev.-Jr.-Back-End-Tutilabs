import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DatabaseModule } from 'src/app/config/database/db.module';
import { BcryptHashService } from 'src/utils/hash/implementations/BcryptHash.service';
import { Hash } from 'src/utils/hash/hash';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, DatabaseModule, JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '8h' },
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, { provide: Hash, useClass: BcryptHashService }, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule { }
