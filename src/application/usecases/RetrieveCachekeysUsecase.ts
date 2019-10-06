import { CacheService } from "../services/CacheService";

export class RetrieveCachekeysUsecase {
	private readonly cacheService: CacheService;

	public constructor(cacheService: CacheService) {
		this.cacheService = cacheService;
	}

	public async invoke(): Promise<string[]> {
		return this.cacheService.getCacheKeys();
	}
}
