import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/./prisma.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule],
})
export class AppModule {}
