import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDto } from './dto/blog.dto';
import { Blog } from './schema/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  getAll() {
    return this.blogModel.find();
  }

  getById(id: string) {
    return this.blogModel.findById(id);
  }

  create(body: BlogDto) {
    return this.blogModel.create(body);
  }

  update(id: string, body: BlogDto) {
    return this.blogModel.findByIdAndUpdate(id, body);
  }

  delete(id: string) {
    return this.blogModel.findByIdAndDelete(id);
  }
}
