import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';

import { handleErrors, whenValidated, body } from './utils';
import { CacheParameters } from '../../model/CacheParameters';

export class AppFactory {

	public constructor() {
	}

	public create(): Application {
		const app: Application = express();

		app
			.use(json())
			.get('/cache',
				body<keyof CacheParameters>('cacheKey').isString().withMessage(`be a string`),
				handleErrors(whenValidated(async (req: Request, res: Response): Promise<void> => {
					res.status(200).json({ message: 'Hello there!' });
				})));


		return app;

	}
}
