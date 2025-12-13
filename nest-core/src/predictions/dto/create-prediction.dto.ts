import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatePredictionDto {
    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsNumber()
    glucose: number;

    @IsNumber()
    hypertension: number;

    @IsNumber()
    heart_disease: number;

    @IsString()
    smoking: string;
}
