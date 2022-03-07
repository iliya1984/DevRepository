import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { StudentController } from './controllers/student.controller';
import { AppService } from './services/app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQueryHandler } from './handlers/students/getStudentsByUniversityIdQuery.handler';
import { StudentRepository } from './repositories/students/student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { StudentDocument, StudentSchema } from './repositories/students/student.schema';
import mongoose from 'mongoose';

@Module({
  // imports: [CqrsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  //   connectionName : 'rafael-task-db'
  // })],
  imports: [CqrsModule, MongooseModule],
  controllers: [AppController, StudentController],
  providers: 
  [
    AppService, 
    GetStudentsByUniversityIdQueryHandler,
    { provide: 'IStudentRepository', useClass: StudentRepository },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb://127.0.0.1:27017/rafael-task-db'),
    },
    {
      provide: 'StudentDocumentModel',
      useFactory: (connection: Connection) => connection.model('rafael-task-db', StudentSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class AppModule {}
