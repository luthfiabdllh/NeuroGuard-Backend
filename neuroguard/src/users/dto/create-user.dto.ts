import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsDateString()
    dob: string;

    @IsNotEmpty()
    @IsString()
    gender: string;
}
