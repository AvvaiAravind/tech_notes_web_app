import { isObjectIdOrHexString } from "mongoose";
import { z } from "zod";

export const objectIdSchema = z
  .string()
  .refine((val) => isObjectIdOrHexString(val), {
    message: "_id must be a valid MongoDB ObjectId",
  });

export const objectIdArraySchema = z.preprocess((val) => {
  if (Array.isArray(val)) {
    return val;
  } else if (typeof val === "string") {
    return [val];
  } else {
    return [];
  }
}, z.array(objectIdSchema).optional());
