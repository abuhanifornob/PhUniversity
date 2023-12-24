import mongoose from "mongoose";

import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  console.log(err?.value);
  const statusCode = 400;

  return {
    statusCode,
    message: "invalide Id",
    errorSources,
  };
};

export default handleCastError;
