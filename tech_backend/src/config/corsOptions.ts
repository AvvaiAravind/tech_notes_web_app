import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow: boolean) => void
  ) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      const error = new Error("Not allowed by CORS");
      error.name = "NotAllowedCorsError";
      callback(error, false); // Block the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // For legacy browser support
};

export default corsOptions;
