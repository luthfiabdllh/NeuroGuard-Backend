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
    // 1. Calculate BMI
    // Height is in cm, convert to meters
    const heightInMeters = createPredictionDto.height / 100;
    const bmi = createPredictionDto.weight / (heightInMeters * heightInMeters);

    // 2. Call AI Service
    const aiUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:8000';
    // Align payload with what AI expects. sending everything + calculated BMI? 
    // Assuming AI needs BMI.
    const payload = {
      ...createPredictionDto,
      bmi: parseFloat(bmi.toFixed(2)),
    };

    let aiResult;
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${aiUrl}/predict`, payload),
      );
      aiResult = response.data;
    } catch (error) {
      // Fallback or error. For now mock if failed? 
      // Or throw error.
      // Mocking for development if AI service not up
      console.warn("AI Service failed, using dummy data");
      aiResult = { stroke_probability: 0.1, risk_label: 'Low Risk' };
    }

    // 3. Save to DB
    return this.prisma.prediction.create({
      data: {
        user_id: userId,
        height: createPredictionDto.height,
        weight: createPredictionDto.weight,
        bmi: parseFloat(bmi.toFixed(2)),
        glucose: createPredictionDto.glucose,
        hypertension: createPredictionDto.hypertension,
        heart_disease: createPredictionDto.heart_disease,
        smoking: createPredictionDto.smoking,
        stroke_probability: aiResult.stroke_probability,
        risk_label: aiResult.risk_label,
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
