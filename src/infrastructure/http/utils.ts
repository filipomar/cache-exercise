import { Response, Request } from 'express';
import { validationResult, body as bodyValidator } from 'express-validator';

import { GenericError } from '../../model/Error';

export const mapErrorResponse = (res: Response, error: GenericError): void => {
	switch (error.type) {
		default:
			res.status(500).json({ message: "Unexpected error occured" });
			return;
	}
};

const errorFormatter = ({ msg, param, value, }: any) => `"${param}" needs to ${msg}.` + (value ? ` "${value}" is invalid` : '');

const validationWrapper = (req: Request, res: Response): boolean => {
	const errors = validationResult(req).formatWith(errorFormatter).array();
	if (errors.length === 0) {
		return true;
	}

	res.status(400).json({ errors });
	return false;
};

/**
 * @param whenValid Will call this handler when your validation checkers have passed
 */
export const whenValidated = (controller: (req: Request, res: Response) => Promise<void>) =>
	(async (req: Request, res: Response): Promise<void> => {
		if (validationWrapper(req, res)) {
			await controller(req, res);
		}
	});

export const handleErrors = (controller: (req: Request, res: Response) => Promise<void>) =>
	(async (req: Request, res: Response): Promise<void> => {
		try {
			await controller(req, res);
		} catch (error) {
			console.error('An error was thrown and handled by the controller wrapper', error);
			mapErrorResponse(res, error);
		}
	});


export const body = <T extends string | string[] | undefined>(fields?: T, message?: any) => {
	return bodyValidator(fields, message);
};
