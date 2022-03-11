import { IConfiguration } from "src/entities/configuration/configuration.interface";

export interface IConfigurationService
{
    get(): Promise<IConfiguration>;
}