import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePredictionDto {
    @ApiProperty({ example: 175, description: 'Height in cm' })
    @IsNumber()
    height: number;

    @ApiProperty({ example: 70, description: 'Weight in kg' })
    @IsNumber()
    weight: number;

    @ApiProperty({ example: 90, description: 'Average glucose level' })
    @IsNumber()
    avg_glucose_level: number;

    @ApiProperty({ example: 0, description: '0 for no hypertension, 1 for hypertension' })
    @IsNumber()
    hypertension: number;

    @ApiProperty({ example: 0, description: '0 for no heart disease, 1 for heart disease' })
    @IsNumber()
    heart_disease: number;

    @ApiProperty({ example: 'Yes', description: 'Ever married status' })
    @IsString()
    @IsNotEmpty()
    ever_married: string;

    @ApiProperty({ example: 'Private', description: 'Work type' })
    @IsString()
    @IsNotEmpty()
    work_type: string;

    @ApiProperty({ example: 'Urban', description: 'Residence type' })
    @IsString()
    @IsNotEmpty()
    Residence_type: string;

    @ApiProperty({ example: 'never smoked', description: 'Smoking status' })
    @IsString()
    @IsNotEmpty()
    smoking_status: string;
}
