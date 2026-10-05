import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.blogService.getAll();
  }

  @HttpCode(200)
  @Get(':id')
  async getAllBy(@Param('id') id: string) {
    return this.blogService.getById(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() body: BlogDto) {
    return this.blogService.create(body);
  }

  @HttpCode(200)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: BlogDto) {
    return this.blogService.update(id, body);
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
