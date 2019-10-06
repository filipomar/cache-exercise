import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';

import { handleErrors, whenValidated } from './utils';

export class AppFactory {

	public constructor() {
	}

	public create(): Application {
		const app: Application = express();

		app
			.use(json())
			.get('/helloworld', handleErrors(whenValidated(async (req: Request, res: Response): Promise<void> => {
				res.status(200).json({ message: 'Hello there!' });
			})));


		return app;

	}
}
