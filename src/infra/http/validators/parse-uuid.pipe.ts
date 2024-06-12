import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

const schema = z.object({
  value: z.string().uuid(),
});

@Injectable()
export class ParseUUIDPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const isValid = metadata.type === 'param' || metadata.type === 'body';

    if (!isValid) {
      return;
    }

    const result = schema.safeParse({ value });

    if (!result.success) {
      throw new BadRequestException('Invalid UUID format');
    }

    return result.data.value;
  }
}
