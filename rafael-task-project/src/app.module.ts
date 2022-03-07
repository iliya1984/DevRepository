import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { StudentController } from './controllers/student.controller';
import { AppService } from './services/app.service';
import { StudentService } from './services/student.service';


@Module({
  imports: [],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
