import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    create(createReminderDto: CreateReminderDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReminderDto: UpdateReminderDto): string;
    remove(id: string): string;
}
