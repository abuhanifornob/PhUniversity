export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TTestError = {
  errorMessage: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
