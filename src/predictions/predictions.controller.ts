import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Predictions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new prediction' })
  create(@Body() createPredictionDto: CreatePredictionDto, @Request() req) {
    return this.predictionsService.create(createPredictionDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all predictions for the current user' })
  findAll(@Request() req) {
    return this.predictionsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prediction details' })
  findOne(@Param('id') id: string) {
    return this.predictionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a prediction' })
  update(@Param('id') id: string, @Body() updatePredictionDto: UpdatePredictionDto) {
    return this.predictionsService.update(id, updatePredictionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prediction' })
  remove(@Param('id') id: string) {
    return this.predictionsService.remove(id);
  }
}
