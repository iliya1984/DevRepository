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
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './services/configuration/configuration.service';
import { IConfigurationService } from './services/configuration/configuration.service.interface';
import { Configuration } from './entities/configuration/configuration';
import { IConfiguration } from './entities/configuration/configuration.interface';

@Module({
  imports: [CqrsModule, MongooseModule, ConfigModule.forRoot()],
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
      provide: 'IConfigurationService', 
      useClass: ConfigurationService 
    },
    { 
      provide: 'IConfiguration', 
      useFactory : (configService: IConfigurationService) =>
      {
        return configService.get();
      },
      inject: ['IConfigurationService'] 
    },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (configuration: IConfiguration): Promise<typeof mongoose> =>
      {
        var connectionString = configuration.dbConnectionString + 'rafael-task-db';
        return mongoose.connect(connectionString);
      },
      inject: ['IConfiguration']
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
