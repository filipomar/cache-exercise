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

/**
 * Reads from the .env file
 */
const configuration: Configuration = new EnvFileConfiguration();

/**
 * Pretends to be a really important data service
 */
const dataService: DataService = new MockedDataService();

/**
 * Actually points the cache
 */
let cacheService: CacheService = new MongoCacheService(configuration);

/**
 * Adds the limited size functionality
 */
cacheService = new MockedLimitedCacheServiceWrapper(configuration, cacheService);

/**
 * Adds the TTL Functionality
 */
cacheService = new MockedTTLCacheServiceWrapper(configuration, cacheService);

const loggingService: LoggingService = new MockedLoggingService();

/**
 * Builds the app [can be used locally or even when deploying on AWS]
 */
const appFactory = new AppFactory(dataService, cacheService, loggingService);

/**
 * Setup the local server
 */
appFactory.create().listen(configuration.getPort(), (): void => console.log(`Listing on port ${configuration.getPort()}`));
