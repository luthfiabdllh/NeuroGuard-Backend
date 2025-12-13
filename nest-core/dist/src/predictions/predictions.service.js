"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let PredictionsService = class PredictionsService {
    prisma;
    httpService;
    configService;
    constructor(prisma, httpService, configService) {
        this.prisma = prisma;
        this.httpService = httpService;
        this.configService = configService;
    }
    async create(createPredictionDto, userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const today = new Date();
        const dob = new Date(user.dob);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        const heightInMeters = createPredictionDto.height / 100;
        const bmi = createPredictionDto.weight / (heightInMeters * heightInMeters);
        const payload = {
            gender: user.gender,
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
        const aiUrl = this.configService.get('AI_SERVICE_URL') || 'http://localhost:8000';
        let aiResult;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(`${aiUrl}/predict`, payload));
            aiResult = response.data;
        }
        catch (error) {
            console.warn("AI Service failed, using dummy data. Error:", error.message);
            aiResult = { stroke_probability: 0.1, risk_label: 'Low Risk (Fallback)' };
        }
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
                stroke_probability: aiResult.stroke_probability,
                risk_label: aiResult.risk_label,
            },
        });
    }
    findAll(userId) {
        return this.prisma.prediction.findMany({ where: { user_id: userId } });
    }
    findOne(id) {
        return this.prisma.prediction.findUnique({ where: { id } });
    }
    update(id, updatePredictionDto) {
        return this.prisma.prediction.update({
            where: { id },
            data: updatePredictionDto,
        });
    }
    remove(id) {
        return this.prisma.prediction.delete({ where: { id } });
    }
};
exports.PredictionsService = PredictionsService;
exports.PredictionsService = PredictionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService,
        config_1.ConfigService])
], PredictionsService);
//# sourceMappingURL=predictions.service.js.map