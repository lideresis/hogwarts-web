
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common';

import { WizardService } from './wizard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Wizard } from './wizard.entity';
import { NewWizard } from './dto/new-wizard.dto';
import { UpdateWizard } from './dto/update-wizard.dto';

@Controller('wizard')
@UseGuards(JwtAuthGuard)
export class WizardController {
  constructor(private readonly wizardService: WizardService) {}

  @Post()
  createWizard(
    @Body() newWizard: NewWizard
  ): Promise<Wizard> {
    return this.wizardService.createWizard(newWizard);
  }

  @Get()
  listTodo(): Promise<Wizard[]> {
    return this.wizardService.listWizards();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getTodo(
    @Param('id') id: string
  ): Promise<Wizard> {
    const wizard = await this.wizardService.getWizard(id);

    return wizard;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateTodo(
    @Param('id') id: string,
    @Body() updates: UpdateWizard
  ): Promise<Wizard> {
    const wizard = await this.wizardService.getWizard(id);

    return this.wizardService.updateWizard(wizard, updates);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTodo(
    @Param('id') id: string,
  ): Promise<Wizard> {
    const wizard = await this.wizardService.getWizard(id);

    return this.wizardService.removeWizard(wizard);
  }
}
