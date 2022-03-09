import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQueryHandler } from './handlers/students/getByUniversityId/getStudentsByUniversityId.query.handler';
import { StudentRepository } from './repositories/students/student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { StudentDocument, StudentSchema } from './repositories/students/student.schema';
import mongoose from 'mongoose';
import { CreateStudentCommandHandler } from './handlers/students/createStudent/createStudent.command.handler';
import { CreateUniversityCommandHandler } from './handlers/universities/createUniversity/createUniversity.command.handler';
import { UniversityRepository } from './repositories/universities/university.repository';
import { UniversitySchema } from './repositories/universities/university.schema';
import { UniversityController } from './controllers/university.controller';
import { GetUniversityByIdQueryHandler } from './handlers/universities/getById/getUniversityById.query.handler';
import { AddEnrollmentCommandHandler } from './handlers/enrollment/addEnrollment/addEnrollment.command.handler';
import { EnrollmentController } from './controllers/enrollment.controller';

@Module({
  imports: [CqrsModule, MongooseModule],
  controllers: [StudentController, UniversityController, EnrollmentController],
  providers: 
  [
    GetStudentsByUniversityIdQueryHandler,
    CreateStudentCommandHandler,
    AddEnrollmentCommandHandler,
    GetUniversityByIdQueryHandler,
    CreateUniversityCommandHandler,
    { provide: 'IStudentRepository', useClass: StudentRepository },
    { provide: 'IUniversityRepository', useClass: UniversityRepository },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb://127.0.0.1:27017/rafael-task-db'),
    },
    {
      provide: 'StudentDocumentModel',
      useFactory: (connection: Connection) => connection.model('students', StudentSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'UniversityDocumentModel',
      useFactory: (connection: Connection) => connection.model('universities', UniversitySchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class AppModule {}
