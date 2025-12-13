import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateReminderDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsInt()
    @Min(1)
    frequency_days: number;

    @IsDateString()
    next_reminder_date: string;

    @IsBoolean()
    is_active: boolean;
}
