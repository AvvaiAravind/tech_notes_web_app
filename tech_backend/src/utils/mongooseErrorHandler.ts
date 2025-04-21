import { logEvents } from "../middleware/logger";

const mongooseConnectionErrorHandler = (
  err: Error & Partial<NodeJS.ErrnoException>
) => {
  logEvents(
    `Message: ${err.message}, Name: ${err.name}, Code: ${err.code}, Syscall: ${err.syscall}, Hostname: ${"hostname" in err ? err.hostname : "N/A"}`,
    "mongoErrLog.log"
  );
};

export default mongooseConnectionErrorHandler;
