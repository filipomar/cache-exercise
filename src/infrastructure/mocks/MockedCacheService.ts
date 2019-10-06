import { CacheService } from "../../application/services/CacheService";
import { Configuration } from "../../application/services/Configuration";

export class MockedCacheService implements CacheService {
	private readonly cache = new Map<string, string>();

	// Limited functionality
	private readonly maxSize: number;
	private readonly topKeys: string[] = [];

	constructor(configuration: Configuration) {
		this.maxSize = configuration.getCacheMaxSize();
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
		removedTopKeys.forEach((key) => this.cache.delete(key));
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

	public async setCache(cacheKey: string, data: string): Promise<void> {
		this.cache.set(cacheKey, data);
		this.addTopKey(cacheKey);
	}

	public async getCache(cacheKey: string): Promise<string | null> {
		const value = this.cache.get(cacheKey) || null;

		if (value !== null) {
			this.addTopKey(cacheKey);
		}

		return value;
	}

	public async getCacheKeys(): Promise<string[]> {
		return Array.from(this.cache.keys());
	}

	public async deleteCache(cacheKey: string): Promise<void> {
		this.cache.delete(cacheKey);
		this.removeTopKey(cacheKey);
	}

	public async clearCache(): Promise<void> {
		this.cache.clear();
		this.removeTopKey(null);
	}
}
