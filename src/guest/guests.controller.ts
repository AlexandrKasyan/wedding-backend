import { Controller, Post, Body, Get, Put, Param, UseGuards, NotFoundException, Headers, Delete } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('guest') // Убрали UseGuards отсюда
export class GuestsController {
    constructor(private readonly guestsService: GuestsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('find-all')
    async findAll() {
        const guests = await this.guestsService.findAll();
        if (!guests) {
            throw new NotFoundException('Guests not found');
        }
        return guests;
    }

   @Get(':token') // Эндпоинт для получения данных гостя по токену
    async findOne(@Param('token') token: string) {
        const guest = await this.guestsService.findOneByToken(token);
        if (!guest) {
            throw new NotFoundException('Guest not found');
        }
        return guest;
    }



    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body('name') name: string) {
        return this.guestsService.create(name);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.guestsService.remove(id);
    }



    @Put(':token')
    async updateRsvpStatus(@Param('token') token: string, @Body('rsvpStatus') rsvpStatus: string, @Body('comment') comment: string) {
        return this.guestsService.updateRsvpStatus(token, rsvpStatus, comment);
    }
}
