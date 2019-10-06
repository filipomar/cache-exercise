import { CacheService } from "../services/CacheService";
import { CacheUpdateParameters } from "../../model/CacheParameters";

export class UpdateCacheUsecase {
	private readonly cacheService: CacheService;

	public constructor(cacheService: CacheService) {
		this.cacheService = cacheService;
	}

	public async invoke({ cacheKey, cacheValue }: CacheUpdateParameters): Promise<void> {
		await this.cacheService.setCache(cacheKey, cacheValue);
	}
}
