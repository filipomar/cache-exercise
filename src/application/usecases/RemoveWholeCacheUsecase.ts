import { CacheService } from "../services/CacheService";

export class RemoveWholeCacheUsecase {
	private readonly cacheService: CacheService;

	public constructor(cacheService: CacheService) {
		this.cacheService = cacheService;
	}

	public async invoke(): Promise<void> {
		await this.cacheService.clearCache();
	}
}
