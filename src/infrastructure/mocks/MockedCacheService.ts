import { CacheService } from "../../application/services/CacheService";

export class MockedCacheService implements CacheService {
	setCache(cacheKey: string, data: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	getCache(cacheKey: string): Promise<string | null> {
		throw new Error("Method not implemented.");
	}


}
