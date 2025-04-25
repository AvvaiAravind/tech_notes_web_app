import { Request, Response } from "express";

type GenerateResponseParamsType = {
  req: Request;
  res: Response;
  message: string;
  status?: number;
  data: unknown;
  metaData?: unknown;
};

export const generateResponse = async ({
  res,
  status = 200,
  message,
  data = null,
  metaData = null,
}: GenerateResponseParamsType) => {
  return res.status(status).json({
    status: "success",
    message,
    data,
    metaData,
  });
};
