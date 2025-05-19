import { Controller, Post, Body } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return createItemDto;
  }
}
