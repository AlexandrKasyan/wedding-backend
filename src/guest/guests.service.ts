import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './guest.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) { }

  async create(name: string): Promise<Guest> {
    const uniqueLinkToken = uuidv4();
    const guest = this.guestsRepository.create({ name, uniqueLinkToken });
    return this.guestsRepository.save(guest);
  }

  async remove(id: number): Promise<void> {
    const guest = await this.guestsRepository.findOneBy({ id });
    if (!guest) {
      throw new NotFoundException(`Guest with ID "${id}" not found`);
    }
    await this.guestsRepository.remove(guest);
  }

  async findOneByToken(uniqueLinkToken: string): Promise<Guest | undefined> {
    return this.guestsRepository.findOne({ where: { uniqueLinkToken } });
  }

  async findAll(): Promise<Guest[] | undefined> {
    return await this.guestsRepository.find();
  }

  async updateRsvpStatus(uniqueLinkToken: string, rsvpStatus: string, comment: string): Promise<Guest | undefined> {
    const guest = await this.findOneByToken(uniqueLinkToken);
    if (!guest) {
      return undefined; // Или выбрось исключение, если нужно
    }
    guest.rsvpStatus = rsvpStatus;
    guest.comment = comment
    return this.guestsRepository.save(guest);
  }
}
