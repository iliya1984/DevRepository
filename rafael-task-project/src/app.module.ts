import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { LoggerMiddleware } from './core/loggerMiddleware';
import { FileLogger } from './services/logging/fileLogger';

@Module({
  imports: [CqrsModule, MongooseModule, ConfigModule.forRoot(), CacheModule.register()],
  controllers: [StudentController, UniversityController, EnrollmentController],
  providers: 
  [
    GetStudentsByUniversityIdQueryHandler,
    CreateStudentCommandHandler,
    AddEnrollmentCommandHandler,
    GetUniversityByIdQueryHandler,
    CreateUniversityCommandHandler,
    { provide: 'ILogger', useClass: FileLogger },
    { provide: 'IStudentRepository', useClass: StudentRepository },
    { provide: 'IUniversityRepository', useClass: UniversityRepository },
    { 
      provide: 'IConfigurationService', 
      useClass: ConfigurationService 
    },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configurationService: IConfigurationService): Promise<typeof mongoose> =>
      {
        var configuration = await configurationService.get();
        var connectionString = configuration.dbConnectionString + 'rafael-task-db';
        return mongoose.connect(connectionString);
      },
      inject: ['IConfigurationService']
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
