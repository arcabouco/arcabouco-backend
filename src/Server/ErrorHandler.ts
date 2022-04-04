import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  console.error(error);
  response.status(500).json({
    status: 500,
    message: "unexpected error",
  });
};
