import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { errorSender, getStackTrace } from "../utils/errorSender";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./socketTypes";

let io: SocketIOServer;

export const initSocket = (httpServer: HTTPServer) => {
  io = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? false
          : [
              "localhost",
              "http://192.168.0.112:5173",
              "http://192.168.43.1.112:5173",
            ],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("client disconnected:", socket.id);
    });
  });
};

const getIO = (): SocketIOServer => {
  if (!io) {
    throw errorSender({
      statusCode: 503,
      stackTrace: getStackTrace(),
      message: "something wrong with starting socket io",
    });
  }
  return io;
};

export default getIO;
