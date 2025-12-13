import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
@Injectable()
export class RemindersService {
    constructor(private prisma: PrismaService) { }

    create(createReminderDto: CreateReminderDto) {
        return this.prisma.predictionReminder.create({
            data: {
                user_id: createReminderDto.user_id,
                frequency_days: createReminderDto.frequency_days,
                next_reminder_date: new Date(createReminderDto.next_reminder_date),
                is_active: createReminderDto.is_active,
            },
        });
    }

    findAll() {
        return this.prisma.predictionReminder.findMany({
            include: { user: true },
        });
    }

    findOne(id: string) {
        return this.prisma.predictionReminder.findUnique({
            where: { id },
            include: { user: true },
        });
    }

    update(id: string, updateReminderDto: UpdateReminderDto) {
        return this.prisma.predictionReminder.update({
            where: { id },
            data: {
                ...updateReminderDto,
                next_reminder_date: updateReminderDto.next_reminder_date
                    ? new Date(updateReminderDto.next_reminder_date)
                    : undefined,
            },
        });
    }

    remove(id: string) {
        return this.prisma.predictionReminder.delete({
            where: { id },
        });
    }
}
