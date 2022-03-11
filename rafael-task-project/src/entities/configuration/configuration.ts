import { IConfiguration } from "./configuration.interface";

export class Configuration implements IConfiguration
{
    public loggingDirectory: string;
    public dbConnectionString: string;
}