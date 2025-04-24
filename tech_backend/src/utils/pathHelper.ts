import { dirname } from "path";
import { fileURLToPath } from "url";

type PathInfo = {
  __filename: string;
  __dirname: string;
};


export const getPathInfo = (metaUrl: string): PathInfo => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
};

