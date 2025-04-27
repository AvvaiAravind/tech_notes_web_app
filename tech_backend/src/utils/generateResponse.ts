import { Request, Response } from "express";

type GenerateResponseParamsType = {
  res: Response;
  message: string;
  statusCode?: number;
  data: unknown;
  metaData?: unknown;
};

export const generateResponse = async ({
  res,
  statusCode = 200,
  message,
  data = null,
  metaData = null,
}: GenerateResponseParamsType) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
    metaData,
  });
};
