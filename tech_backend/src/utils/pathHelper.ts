import { dirname } from "path";
import { fileURLToPath } from "url";

const getPathInfo = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
};

export default getPathInfo;
