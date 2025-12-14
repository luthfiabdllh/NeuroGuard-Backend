import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reminders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reminders')
export class RemindersController {
    constructor(private readonly remindersService: RemindersService) { }

    @Post()
    create(@Body() createReminderDto: CreateReminderDto, @Request() req) {
        return this.remindersService.create(createReminderDto, req.user.id);
    }

    @Get()
    findAll(@Request() req) {
        return this.remindersService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.remindersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
        return this.remindersService.update(id, updateReminderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.remindersService.remove(id);
    }
}
