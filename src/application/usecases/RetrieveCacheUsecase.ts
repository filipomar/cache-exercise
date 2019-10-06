import { DataService } from "../services/DataService";
import { CacheService } from "../services/CacheService";
import { LoggingService } from "../services/LoggingService";
import { CacheRetrievalParameters } from "../../model/CacheParameters";

export class RetrieveCacheUsecase {
	private readonly cacheService: CacheService;
	private readonly loggingService: LoggingService;
	private readonly dataService: DataService;

	public constructor(dataService: DataService, cacheService: CacheService, loggingService: LoggingService) {
		this.dataService = dataService;
		this.cacheService = cacheService;
		this.loggingService = loggingService;
	}

	public async invoke({ cacheKey }: CacheRetrievalParameters): Promise<string> {
		let data: string | null = await this.cacheService.getCache(cacheKey);
		if (data === null) {
			this.loggingService.info("Cache miss");
			data = await this.dataService.fetch(cacheKey);
			await this.cacheService.setCache(cacheKey, data);
		} else {
			this.loggingService.info("Cache hit");
		}

		return data;
	}
}
