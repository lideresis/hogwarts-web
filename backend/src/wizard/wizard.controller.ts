
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Query,
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
import { Pagination } from 'nestjs-typeorm-paginate';
import { OrderType } from 'src/types';

@Controller('wizard')
//@UseGuards(JwtAuthGuard)
export class WizardController {
  constructor(private readonly wizardService: WizardService) {}

  @Post()
  createWizard(
    @Body() newWizard: NewWizard
  ): Promise<Wizard> {
    return this.wizardService.createWizard(newWizard);
  }

  @Get()
  async listWizards(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = "created_at",
    @Query('orderType') orderType = OrderType.DESC
  ): Promise<Pagination<Wizard>> {
    return this.wizardService.listWizards({
      page, limit, orderBy, orderType
    }
    );
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getWizard(
    @Param('id') id: string
  ): Promise<Wizard> {
    const wizard = await this.wizardService.getWizard(id);

    return wizard;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateWizard(
    @Param('id') id: string,
    @Body() updates: UpdateWizard
  ): Promise<Wizard> {
    const wizard = await this.wizardService.getWizard(id);

    return this.wizardService.updateWizard(wizard, updates);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeWizard(
    @Param('id') id: string,
  ): Promise<Wizard> {
    const wizard = await this.wizardService.getWizard(id);

    return this.wizardService.removeWizard(wizard);
  }
}
