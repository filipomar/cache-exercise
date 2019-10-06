import { CacheService } from "../../application/services/CacheService";
import { Configuration } from "../../application/services/Configuration";

export class MockedTTLCacheServiceWrapper implements CacheService {
	private readonly cacheService: CacheService;

	private readonly ttl = new Map<string, NodeJS.Timeout>();
	private readonly timeToLeave: number;

	constructor(configuration: Configuration, cacheService: CacheService) {
		this.timeToLeave = configuration.getTimeToLeave();
		this.cacheService = cacheService;
	}

	private async createTTL(cacheKey: string): Promise<void> {
		if (!this.timeToLeave) {
			return;
		}

		let timeoutId = this.ttl.get(cacheKey);

		if (timeoutId) {
			// Clear any previous TTL [resetig the clock]
			global.clearTimeout(timeoutId);
		}

		timeoutId = global.setTimeout(() => {
			this.deleteCache(cacheKey);
		}, this.timeToLeave);
		this.ttl.set(cacheKey, timeoutId);
	}

	public clearCache(): Promise<void> {
		return this.cacheService.clearCache();
	}

	public async setCache(cacheKey: string, data: string): Promise<void> {
		await this.cacheService.setCache(cacheKey, data);
		this.createTTL(cacheKey);
	}

	public async getCache(cacheKey: string): Promise<string | null> {
		const value = await this.cacheService.getCache(cacheKey);
		if (value !== null) {
			this.createTTL(cacheKey);
		}
		return value;
	}

	public getCacheKeys(): Promise<string[]> {
		return this.cacheService.getCacheKeys();
	}

	public deleteCache(cacheKey: string): Promise<void> {
		return this.cacheService.deleteCache(cacheKey);
	}

}
