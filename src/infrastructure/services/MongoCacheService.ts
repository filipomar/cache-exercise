

import { MongoClient, Collection } from 'mongodb';

import { GenericError, ErrorType } from '../../model/Error';

import { CacheService } from '../../application/services/CacheService';
import { Configuration } from '../../application/services/Configuration';

interface MongoCacheEntry {
	readonly _id: string;
	readonly value: string;
}

export class MongoCacheService implements CacheService {
	private static collectionName = 'mongoCache';

	private readonly connectionUrl: string;
	private readonly databaseName: string;

	constructor(configuration: Configuration) {
		this.connectionUrl = configuration.getMongoConnectionUrl();
		this.databaseName = configuration.getMongoDatabaseName();
	}

	private async withConnection<T>(callback: (collection: Collection<MongoCacheEntry>) => Promise<T>): Promise<T> {
		const client = new MongoClient(this.connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });

		try {
			await client.connect();
			const db = client.db(this.databaseName);
			const collection = db.collection(MongoCacheService.collectionName);

			return await callback(collection);
		} catch (e) {
			throw new GenericError(ErrorType.UNEXPECTED);
		} finally {
			client.close();
		}
	}

	public async clearCache(): Promise<void> {
		return this.withConnection<void>(async (collection) => {
			await collection.deleteMany({});
		});
	}

	public async setCache(cacheKey: string, cacheValue: string): Promise<void> {
		return this.withConnection<void>(async (collection) => {
			await collection.replaceOne({ _id: cacheKey }, { _id: cacheKey, value: cacheValue }, { upsert: true });
		});
	}

	public async getCache(cacheKey: string): Promise<string | null> {
		return this.withConnection<string | null>(async (collection) => {
			const result = await collection.findOne({ _id: cacheKey });
			return result && result.value;
		});
	}

	public async getCacheKeys(): Promise<string[]> {
		return this.withConnection<string[]>(async (collection) => {
			const result = await collection.find({}).toArray();
			return result.map(({ _id }) => _id);
		});
	}

	public async deleteCache(cacheKey: string): Promise<void> {
		return this.withConnection<void>(async (collection) => {
			await collection.deleteOne({ _id: cacheKey, });
		});
	}
}
