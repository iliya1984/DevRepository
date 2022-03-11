import { Configuration } from "src/entities/configuration/configuration";
import { IConfiguration } from "src/entities/configuration/configuration.interface";
import { IConfigurationService } from "./configuration.service.interface";

export class ConfigurationService implements IConfigurationService
{
    get(): IConfiguration
    {
        var configuration = new Configuration();
        configuration.dbConnectionString = process.env.TempDBServerPath;
        configuration.loggingDirectory = process.env.TempLogPath;

        return configuration;
    }
    
}