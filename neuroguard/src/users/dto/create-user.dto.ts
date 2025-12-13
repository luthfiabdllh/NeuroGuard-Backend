import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth (ISO 8601)' })
    @IsDateString()
    dob: string;

    @ApiProperty({ example: 'Male', description: 'Gender of the user' })
    @IsNotEmpty()
    @IsString()
    gender: string;
}
