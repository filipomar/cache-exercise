import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';

import { handleErrors, whenValidated, body } from './utils';

import { CacheParameters } from '../../model/CacheParameters';

import { DataService } from '../../application/services/DataService';
import { CacheService } from '../../application/services/CacheService';
import { LoggingService } from '../../application/services/LoggingService';

import { RetrieveCacheUsecase } from '../../application/usecases/RetrieveCacheUsecase';

export class AppFactory {
	private readonly retrieveCacheUsecase: RetrieveCacheUsecase;

	public constructor(dataService: DataService, cacheService: CacheService, loggingService: LoggingService) {
		this.retrieveCacheUsecase = new RetrieveCacheUsecase(dataService, cacheService, loggingService);
	}

	public create(): Application {
		const app: Application = express();

		app
			.use(json())
			.get('/cache',
				body<keyof CacheParameters>('cacheKey').isString().withMessage(`be a string`),
				handleErrors(whenValidated(async ({ body }: Request, res: Response): Promise<void> => {
					res.status(200).json(await this.retrieveCacheUsecase.invoke(body));
				})));


		return app;

	}
}
