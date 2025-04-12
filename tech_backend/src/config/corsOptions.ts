import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"), false); // Block the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // For legacy browser support
};

export default corsOptions;
