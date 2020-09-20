import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/config.service'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WizardModule } from './wizard/wizard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.typeOrmConfig),
    AuthModule,
    UsersModule,
    WizardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
