let errorCount = 0;

const getErrorCount = () => {
	return errorCount;
};

const incrementError = () => {
	errorCount += 1;
};

const clearErrors = () => {
	errorCount = 0;
};

export const errorManager = {
	getErrorCount,
	incrementError,
	clearErrors,
};
