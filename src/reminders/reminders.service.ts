import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
@Injectable()
export class RemindersService {
    constructor(private prisma: PrismaService) { }

    create(createReminderDto: CreateReminderDto, userId: string) {
        // Calculate next reminder date based on frequency if not provided or valid
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + createReminderDto.frequency_days);

        return this.prisma.predictionReminder.create({
            data: {
                user_id: userId,
                frequency_days: createReminderDto.frequency_days,
                next_reminder_date: createReminderDto.next_reminder_date ? new Date(createReminderDto.next_reminder_date) : nextDate,
                is_active: createReminderDto.is_active,
            },
        });
    }

    findAll(userId: string) {
        return this.prisma.predictionReminder.findMany({
            where: { user_id: userId },
            include: { user: false }, // Don't need user details in list
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
