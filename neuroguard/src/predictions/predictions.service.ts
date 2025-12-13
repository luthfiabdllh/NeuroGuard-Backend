import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PredictionsService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) { }

  async create(createPredictionDto: CreatePredictionDto, userId: string) {
    // 0. Fetch User Details for Age and Gender
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // 1. Calculate Age
    const today = new Date();
    const dob = new Date(user.dob);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // 2. Calculate BMI
    // Height is in cm, convert to meters
    const heightInMeters = createPredictionDto.height / 100;
    const bmi = createPredictionDto.weight / (heightInMeters * heightInMeters);

    // 3. Prepare Payload for AI Service
    // Matches: { gender, age, hypertension, heart_disease, ever_married, work_type, Residence_type, avg_glucose_level, bmi, smoking_status }
    const payload = {
      gender: user.gender, // Assumes 'Male'/'Female' stored in User matches AI expectation
      age: parseFloat(age.toString()),
      hypertension: createPredictionDto.hypertension,
      heart_disease: createPredictionDto.heart_disease,
      ever_married: createPredictionDto.ever_married,
      work_type: createPredictionDto.work_type,
      Residence_type: createPredictionDto.Residence_type,
      avg_glucose_level: createPredictionDto.avg_glucose_level,
      bmi: parseFloat(bmi.toFixed(2)),
      smoking_status: createPredictionDto.smoking_status,
    };

    // 4. Call AI Service
    const aiUrl = this.configService.get<string>('AI_SERVICE_URL');

    let aiResult;
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${aiUrl}/predict`, payload),
      );
      aiResult = response.data;
    } catch (error) {
      console.warn("AI Service failed, using dummy data. Error:", error.message);
      // Fallback or error. 
      aiResult = { probability: 0.1, risk_level: 'Low Risk (Fallback)' };
    }

    // 5. Save to DB
    return this.prisma.prediction.create({
      data: {
        user_id: userId,
        gender: user.gender,
        age: age,
        height: createPredictionDto.height,
        weight: createPredictionDto.weight,
        bmi: parseFloat(bmi.toFixed(2)),
        avg_glucose_level: createPredictionDto.avg_glucose_level,
        hypertension: createPredictionDto.hypertension,
        heart_disease: createPredictionDto.heart_disease,
        smoking_status: createPredictionDto.smoking_status,
        example_married: createPredictionDto.ever_married,
        work_type: createPredictionDto.work_type,
        residence_type: createPredictionDto.Residence_type,
        stroke_probability: aiResult.probability,
        risk_label: aiResult.risk_level,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.prediction.findMany({ where: { user_id: userId } });
  }

  findOne(id: string) {
    return this.prisma.prediction.findUnique({ where: { id } });
  }

  update(id: string, updatePredictionDto: UpdatePredictionDto) {
    return this.prisma.prediction.update({
      where: { id },
      data: updatePredictionDto,
    });
  }

  remove(id: string) {
    return this.prisma.prediction.delete({ where: { id } });
  }
}
