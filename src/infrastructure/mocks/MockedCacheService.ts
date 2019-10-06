import { CacheService } from "../../application/services/CacheService";

export class MockedCacheService implements CacheService {

	private cache = new Map<string, string>();

	public async setCache(cacheKey: string, data: string): Promise<void> {
		this.cache.set(cacheKey, data);
	}

	public async getCache(cacheKey: string): Promise<string | null> {
		return this.cache.get(cacheKey) || null;
	}

	public async getCacheKeys(): Promise<string[]> {
		return Array.from(this.cache.keys());
	}

	public async deleteCache(cacheKey: string): Promise<void> {
		this.cache.delete(cacheKey);
	}
}
