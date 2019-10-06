import { CacheService } from "../../application/services/CacheService";
import { Configuration } from "../../application/services/Configuration";

export class MockedLimitedCacheServiceWrapper implements CacheService {
	private readonly cacheService: CacheService;

	// Limited functionality
	private readonly maxSize: number;
	private readonly topKeys: string[] = [];

	constructor(configuration: Configuration, cacheService: CacheService) {
		this.maxSize = configuration.getCacheMaxSize();
		this.cacheService = cacheService;
	}

	private async addTopKey(cacheKey: string) {
		if (!this.maxSize) {
			return;
		}

		// Remove the key if it's already on the list
		this.removeTopKey(cacheKey);
		// Add it to the top of the list
		this.topKeys.push(cacheKey);
		// Remove the bottom of the list
		const removedTopKeys = this.topKeys.splice(0, this.topKeys.length - this.maxSize);
		// Reflect that on the cache
		removedTopKeys.forEach((key) => this.cacheService.deleteCache(key));
	}

	private async removeTopKey(cacheKey: string | null) {
		if (!this.maxSize) {
			return;
		}

		if (cacheKey === null) {
			// Clear it all
			this.topKeys.splice(0);
			return;
		}

		const index = this.topKeys.indexOf(cacheKey);
		if (index >= 0) {
			// Remove from the list
			this.topKeys.splice(index, 1);
		}
	}

	public async clearCache(): Promise<void> {
		await this.cacheService.clearCache();
		this.removeTopKey(null);
	}

	public async setCache(cacheKey: string, data: string): Promise<void> {
		await this.cacheService.setCache(cacheKey, data);
		this.addTopKey(cacheKey);
	}

	public async getCache(cacheKey: string): Promise<string | null> {
		const value = await this.cacheService.getCache(cacheKey);

		if (value !== null) {
			this.addTopKey(cacheKey);
		}

		return value;
	}

	public getCacheKeys(): Promise<string[]> {
		return this.cacheService.getCacheKeys();
	}

	public async deleteCache(cacheKey: string): Promise<void> {
		await this.cacheService.deleteCache(cacheKey);
		this.removeTopKey(cacheKey);
	}
}
