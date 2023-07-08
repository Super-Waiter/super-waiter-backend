import { IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";

type SocketType = Server<typeof IncomingMessage, typeof ServerResponse>;

export const useSocket = (io: SocketType) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
