import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { StudentController } from './controllers/student.controller';
import { AppService } from './services/app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQueryHandler } from './handlers/students/getStudentsByUniversityIdQuery.handler';
import { StudentRepository } from './repositories/students/student.repository';

@Module({
  imports: [CqrsModule],
  controllers: [AppController, StudentController],
  providers: 
  [
    AppService, 
    GetStudentsByUniversityIdQueryHandler,
    { provide: 'IStudentRepository', useClass: StudentRepository },
  ],
})
export class AppModule {}
