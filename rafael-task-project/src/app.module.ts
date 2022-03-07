import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { StudentController } from './controllers/student.controller';
import { AppService } from './services/app.service';
import { StudentService } from './services/students/student.service';
import { IStudentService } from './services/students/istudent.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQueryHandler } from './handlers/students/getStudentsByUniversityIdQueryHandler';
import { StudentRepository } from './repositories/students/studentRepository';

@Module({
  imports: [CqrsModule],
  controllers: [AppController, StudentController],
  providers: 
  [
    AppService, 
    { provide: 'IStudentService', useClass: StudentService },
    GetStudentsByUniversityIdQueryHandler,
    { provide: 'IStudentRepository', useClass: StudentRepository },
  ],
})
export class AppModule {}
