import { IConfiguration } from "./configuration.interface";

export class Configuration implements IConfiguration
{
    public dbConnectionString: string;
}