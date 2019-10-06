import { AppFactory } from "../http/AppFactory";

import { DataService } from "../../application/services/DataService";
import { CacheService } from "../../application/services/CacheService";
import { LoggingService } from "../../application/services/LoggingService";

import { MockedDataService } from "../mocks/MockedDataService";
import { MockedCacheService } from "../mocks/MockedCacheService";
import { MockedLoggingService } from "../mocks/MockedLoggingService";

const dataService: DataService = new MockedDataService();
const cacheService: CacheService = new MockedCacheService();
const loggingService: LoggingService = new MockedLoggingService();

const appFactory = new AppFactory(dataService, cacheService, loggingService);
const app = appFactory.create();

const port = 3000;
app.listen(port, (): void => console.log(`Listing on port ${port}`));
