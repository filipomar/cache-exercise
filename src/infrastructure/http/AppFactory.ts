import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';

import { handleErrors, whenValidated, body, query } from './utils';

import { CacheRetrievalParameters, CacheUpdateParameters } from '../../model/CacheParameters';

import { DataService } from '../../application/services/DataService';
import { CacheService } from '../../application/services/CacheService';
import { LoggingService } from '../../application/services/LoggingService';

import { RetrieveCacheUsecase } from '../../application/usecases/RetrieveCacheUsecase';
import { RetrieveCachekeysUsecase } from '../../application/usecases/RetrieveCachekeysUsecase';
import { UpdateCacheUsecase } from '../../application/usecases/UpdateCacheUsecase';

export class AppFactory {
	private readonly retrieveCacheUsecase: RetrieveCacheUsecase;
	private readonly retrieveCachekeysUsecase: RetrieveCachekeysUsecase;
	private readonly updateCacheUsecase: UpdateCacheUsecase;

	public constructor(dataService: DataService, cacheService: CacheService, loggingService: LoggingService) {
		this.retrieveCacheUsecase = new RetrieveCacheUsecase(dataService, cacheService, loggingService);
		this.retrieveCachekeysUsecase = new RetrieveCachekeysUsecase(cacheService);
		this.updateCacheUsecase = new UpdateCacheUsecase(cacheService);
	}

	public create(): Application {
		const app: Application = express();

		app
			.get('/cache',
				query<keyof CacheRetrievalParameters>('cacheKey').isString().withMessage(`be a string`),
				handleErrors(whenValidated(async ({ query }: Request, res: Response): Promise<void> => {
					res.status(200).json(await this.retrieveCacheUsecase.invoke(query));
				})));

		app
			.get('/cache/keys',
				handleErrors(whenValidated(async (req: Request, res: Response): Promise<void> => {
					res.status(200).json(await this.retrieveCachekeysUsecase.invoke());
				})));

		app
			.use(json())
			.put('/cache',
				body<keyof CacheUpdateParameters>('cacheKey').isString().withMessage(`be a string`),
				body<keyof CacheUpdateParameters>('cacheValue').isString().withMessage(`be a string`),
				handleErrors(whenValidated(async ({ body }: Request, res: Response): Promise<void> => {
					await this.updateCacheUsecase.invoke(body);
					res.status(200).end();
				})));

		return app;

	}
}
