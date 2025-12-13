import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) { }

  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto, @Request() req) {
    return this.predictionsService.create(createPredictionDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.predictionsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePredictionDto: UpdatePredictionDto) {
    return this.predictionsService.update(id, updatePredictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictionsService.remove(id);
  }
}
