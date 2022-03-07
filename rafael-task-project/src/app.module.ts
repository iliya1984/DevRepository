import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { StudentController } from './controllers/student.controller';
import { AppService } from './services/app.service';
import { StudentService } from './services/students/student.service';
import { IStudentService } from './services/students/istudent.service';

@Module({
  imports: [],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],//{ provide: 'studentService', useClass: StudentService }],
})
export class AppModule {}
