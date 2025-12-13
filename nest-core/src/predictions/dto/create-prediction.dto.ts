import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatePredictionDto {
    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsNumber()
    avg_glucose_level: number;

    @IsNumber()
    hypertension: number;

    @IsNumber()
    heart_disease: number;

    @IsString()
    @IsNotEmpty()
    ever_married: string;

    @IsString()
    @IsNotEmpty()
    work_type: string;

    @IsString()
    @IsNotEmpty()
    Residence_type: string;

    @IsString()
    @IsNotEmpty()
    smoking_status: string;
}
