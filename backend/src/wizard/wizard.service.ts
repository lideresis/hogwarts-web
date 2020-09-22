import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { NewWizard } from './dto/new-wizard.dto';
import { UpdateWizard } from './dto/update-wizard.dto';

import { Wizard } from './wizard.entity';
import { PaginationParams } from '../types'; 

@Injectable()
export class WizardService {
  constructor(
    @InjectRepository(Wizard)
    private readonly repo: Repository<Wizard>,
  ) {}

  createWizard(newWizard: NewWizard): Promise<Wizard> {
    const wizard = this.repo.create(newWizard);

    return this.repo.save(wizard);
  }

  async listWizards(params: PaginationParams): Promise<Pagination<Wizard>> {
    const queryBuilder = this.repo.createQueryBuilder('w');
    queryBuilder.orderBy('w.' + params.orderBy, params.orderType);
 
    return paginate<Wizard>(queryBuilder, {page: params.page, limit: params.limit});
  }

  async getWizard(id: string): Promise<Wizard> {
    const wizard = await this.repo.findOne(id);

    if (!wizard) throw new NotFoundException(`Not found any wizard with id: ${id}`);

    return wizard;
  }

  async updateWizard(wizard: Wizard, updates: UpdateWizard): Promise<Wizard> {
    Object.assign(wizard, updates);

    return this.repo.save(wizard);
  }

  async removeWizard(wizard: Wizard): Promise<Wizard> {
    return this.repo.remove(wizard);
  }
}
