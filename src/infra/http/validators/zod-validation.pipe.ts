import { BadRequestException, PipeTransform, UsePipes } from '@nestjs/common';
import { z } from 'zod';

export const Validate = (schema: z.ZodType<any>) =>
  UsePipes(new ZodValidationPipe(schema));

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType<any>) {}

  transform(value: any) {
    const results = this.schema.safeParse(value);

    if (!results.success) {
      return new BadRequestException(
        results.error.errors.map((error) => error.message).join(', '),
      );
    }

    return results.data;
  }
}
