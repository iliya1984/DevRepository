import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Configuration } from "src/entities/configuration/configuration";
import { IConfiguration } from "src/entities/configuration/configuration.interface";
import { IConfigurationService } from "./configuration.service.interface";
import { Cache } from 'cache-manager';

export class ConfigurationService implements IConfigurationService
{
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache)
    {

    }

    public async get(): Promise<IConfiguration>
    {
        var configuration : IConfiguration = await this.cacheManager.get<IConfiguration>('configuration');

        if(configuration == undefined)
        {
            configuration = new Configuration();
            configuration.dbConnectionString = process.env.TempDBServerPath;
            configuration.loggingDirectory = process.env.TempLogPath;

            await this.cacheManager.set<IConfiguration>('configuration', configuration, { ttl : 60000});
        }

        
        return configuration;
    }
    
}