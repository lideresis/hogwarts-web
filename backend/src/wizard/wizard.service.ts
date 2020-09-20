import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewWizard } from './dto/new-wizard.dto';
import { UpdateWizard } from './dto/update-wizard.dto';

import { Wizard } from './wizard.entity'

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

  listWizards(): Promise<Wizard[]> {
    return this.repo.find({ order: { created_at: 'DESC' } });
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
