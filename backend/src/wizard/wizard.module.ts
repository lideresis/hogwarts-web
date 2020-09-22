import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WizardController } from './wizard.controller';
import { WizardService } from './wizard.service';
import { Wizard } from './wizard.entity';

@Module({
  controllers: [WizardController],
  imports: [TypeOrmModule.forFeature([Wizard])],
  providers: [WizardService]
})
export class WizardModule {}
