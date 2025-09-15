import { createServer } from "http";
import mongoose from "mongoose";
import app from ".";
import connectDB from "./config/dbConn";
import { initSocket } from "./socket/socket";
import { mongooseConnectionErrorHandler } from "./utils/mongooseErrorHandler";

const PORT = process.env.PORT || 3500;

// Start the server
const httpServer = createServer(app);

connectDB(); // connect db

initSocket(httpServer); // initiating socket io server

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  httpServer.listen(PORT, () => {
    // changed from app.listen to httpServer since we are using socket.io
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

mongoose.connection.on(
  "error",
  (err: Error & Partial<NodeJS.ErrnoException>) => {
    console.log(err);
    mongooseConnectionErrorHandler(err);
  }
);
