import { AppFactory } from "../http/AppFactory";

import { DataService } from "../../application/services/DataService";
import { CacheService } from "../../application/services/CacheService";
import { LoggingService } from "../../application/services/LoggingService";
import { Configuration } from "../../application/services/Configuration";

import { MockedDataService } from "../mocks/MockedDataService";
import { MongoCacheService } from "../services/MongoCacheService";
import { MockedLoggingService } from "../mocks/MockedLoggingService";
import { MockedLimitedCacheServiceWrapper } from "../mocks/MockedLimitedCacheServiceWrapper";
import { MockedTTLCacheServiceWrapper } from "../mocks/MockedTTLCacheServiceWrapper";
import { EnvFileConfiguration } from "../services/EnvFileConfiguration";

const configuration: Configuration = new EnvFileConfiguration();
const dataService: DataService = new MockedDataService();

const cacheService: CacheService = new MockedTTLCacheServiceWrapper(configuration, new MockedLimitedCacheServiceWrapper(configuration, new MongoCacheService(configuration)));
const loggingService: LoggingService = new MockedLoggingService();

const appFactory = new AppFactory(dataService, cacheService, loggingService);
const app = appFactory.create();

app.listen(configuration.getPort(), (): void => console.log(`Listing on port ${configuration.getPort()}`));
