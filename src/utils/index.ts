import { IdefaultAppReturn } from '../interfaces/intex';

export const defaultAppReturn = (arg: IdefaultAppReturn): IdefaultAppReturn => {
	const { status, message, data } = arg;
	return {
		status,
		message,
		data
	};
};
