import { ConsoleLogger } from "@nestjs/common";
import { promisify } from "util";
import { readFile, writeFile, mkdirSync, existsSync, appendFile  }  from 'fs';

export class FileLogger extends ConsoleLogger
{
    private filePath : string = 'C:\\logs';
    private fileName: string = 'logFile';
    private fileExtension: string = 'txt';

    public error(message: any, stack?: string, context?: string): void
    {
        var fullFilePath = this.createFileFullPath();

        if(!this.checkIfFileOrDirectoryExists(fullFilePath))
        {
            this.writeToFile(this.filePath, fullFilePath, message);
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

        super.error(message, stack, context);
    }
   
    private async writeToFile(path: string, filePath: string, data: string): Promise<void>
    {
        if (!this.checkIfFileOrDirectoryExists(path)) 
        {
            mkdirSync(path);
        }
      
        const writeFileAsync = promisify(writeFile);
      
        return await writeFileAsync(filePath, data, 'utf8');
    }

    private checkIfFileOrDirectoryExists(path: string): boolean {
        return existsSync(path);
    }

    private createFileFullPath() : string
    {
        const nowDate = new Date(Date.now());
        const month = nowDate.getMonth();
        const date =  nowDate.getDate();
        const year = nowDate.getFullYear();

        return `${this.filePath}\\${this.fileName}_${date}_${month}_${year}.${this.fileExtension}`;
    }
}