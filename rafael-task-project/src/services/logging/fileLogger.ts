import { ConsoleLogger, Inject, LogLevel } from "@nestjs/common";
import { promisify } from "util";
import { readFile, writeFile, mkdirSync, existsSync, appendFile  }  from 'fs';
import { LogLevelTypes } from "src/entities/logging/logLevels";
import { IConfigurationService } from "../configuration/configuration.service.interface";

export class FileLogger extends ConsoleLogger
{
    private fileName: string = 'logFile';
    private fileExtension: string = 'txt';

    private filePath : string;

    constructor(@Inject('IConfigurationService') private readonly configurationService : IConfigurationService)
    {
        super();

        configurationService.get().then(config =>
        {
            this.filePath = config.loggingDirectory;
        });
    }

    public log(message: any, context?: string): void
    {
        this.createLog(message, LogLevelTypes.Information, null, context);
        super.log(message, context);
    }

    public error(message: any, stack?: string, context?: string): void
    {
        this.createLog(message, LogLevelTypes.Error, stack, context);
        super.error(message, stack, context);
    }
   
    private createLog(message: any, level : LogLevelTypes, stack?: string, context?: string)
    {
        var fullFilePath = this.createFileFullPath(level);

        if(!this.checkIfFileOrDirectoryExists(fullFilePath))
        {
            this.writeToFile(this.filePath, fullFilePath, message, level);
        }
        else
        {
            appendFile(fullFilePath, '\n' + message, err =>
            {
                if(err)
                {
                    console.log(err);
                }
            });
        }

    }

    private async writeToFile(path: string, filePath: string, data: string, level : LogLevelTypes): Promise<void>
    {
        var subfolder = this.getSubfolderByLevel(level);
        var logDirectory = `${this.filePath}\\${subfolder}`;

        if (!this.checkIfFileOrDirectoryExists(logDirectory)) 
        {
            mkdirSync(logDirectory);
        }
      
        const writeFileAsync = promisify(writeFile);
      
        return await writeFileAsync(filePath, data, 'utf8');
    }

    private checkIfFileOrDirectoryExists(path: string): boolean {
        return existsSync(path);
    }

    private createFileFullPath(level : LogLevelTypes) : string
    {
        const subfolder = this.getSubfolderByLevel(level);

        const nowDate = new Date(Date.now());
        const month = nowDate.getMonth();
        const date =  nowDate.getDate();
        const year = nowDate.getFullYear();

        return `${this.filePath}\\${subfolder}\\${this.fileName}_${date}_${month}_${year}.${this.fileExtension}`;
    }

    private getSubfolderByLevel(level : LogLevelTypes) : string
    {
        var subfolder = '';

        switch(level)
        {
            case LogLevelTypes.Information:
                subfolder = 'information';
                break;
            case LogLevelTypes.Error:
                subfolder = 'errors';
                break;
            default:
                subfolder = 'other';
        }

        return subfolder;
    }
}