import { Module } from '@nestjs/common';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor } from '@app/common';
import * as redisStore from 'cache-manager-redis-store';
import { getConfig } from '@app/common';
import { UserModule } from './userCenter/user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class UserCenterModule { }
