import { BadRequestException, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType<any>) {}

  transform(value: any) {
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      throw new BadRequestException(error.errors);
    }
  }
}
