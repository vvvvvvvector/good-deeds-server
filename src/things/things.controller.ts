import {
  Req,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ThingsService } from './things.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateThingDto } from './dto/create-thing.dto';

@Controller('things')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('things')
export class ThingsController {
  constructor(private readonly thingsService: ThingsService) {}

  @Get(':id')
  getThingById(@Param('id', ParseIntPipe) id: number) {
    return this.thingsService.getThingById(id);
  }

  @Get()
  getAllThings(@Req() req) {
    return this.thingsService.getAllUserThings(req.userId);
  }

  @Post()
  addThing(@Req() req, @Body() dto: CreateThingDto) {
    return this.thingsService.createNewThing(req.userId, dto);
  }

  @Delete(':id')
  deleteThing(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.thingsService.deleteThing(req.userId, id);
  }

  @Patch(':id')
  updateThing(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateThingDto,
  ) {
    return this.thingsService.updateThing(req.userId, id, dto);
  }
}
