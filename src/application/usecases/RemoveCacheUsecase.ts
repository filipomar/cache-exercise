import { CacheService } from "../services/CacheService";
import { CacheRemovalParameters } from "../../model/CacheParameters";

export class RemoveCacheUsecase {
	private readonly cacheService: CacheService;

	public constructor(cacheService: CacheService) {
		this.cacheService = cacheService;
	}

	public async invoke({ cacheKey }: CacheRemovalParameters): Promise<void> {
		await this.cacheService.deleteCache(cacheKey);
	}
}
