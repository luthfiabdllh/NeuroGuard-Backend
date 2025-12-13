import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
export declare class RemindersService {
    create(createReminderDto: CreateReminderDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReminderDto: UpdateReminderDto): string;
    remove(id: number): string;
}
