import { DataService } from "../services/DataService";
import { CacheService } from "../services/CacheService";
import { LoggingService } from "../services/LoggingService";
import { CacheParameters } from "../../model/CacheParameters";

export class RetrieveCacheUsecase {
	public constructor(dataService: DataService, cacheService: CacheService, loggingService: LoggingService) {

	}

	public async invoke(body: CacheParameters): Promise<string> {
		throw new Error("Method not implemented.");
	}
}
