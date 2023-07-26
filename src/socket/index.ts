import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ClientToServerEvents, ServerToClientEvents } from "./type";
import { checkQrcodeBySocket } from "./controller/checkQrcode";
import { updateRoomBySocket } from "./controller/room/updateRoom";
import { checkClient } from "./controller/client/checkClient";
import { checkClientByRoomId } from "./controller/client/checkClinetByRoomId";
import { closeRoom } from "./controller/room/closeRoom";

type SocketType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap
>;

const connectedUsers: { [userId: string]: Socket } = {};

export const useSocket = (io: SocketType) => {
  io.on("connection", (socket) => {
    console.log("new user socket user: " + socket.id);
    connectedUsers[socket.id] = socket;

    const recipientSocket = connectedUsers[socket.id];
    recipientSocket.emit("user-joined", socket.id);

    // check Qr code
    checkQrcodeBySocket(socket);

    // update Room
    updateRoomBySocket(socket);

    // check Client
    checkClient(socket);

    // check Client by Room Id
    checkClientByRoomId(socket);

    // close Room
    closeRoom(socket);

    // // Disconnect client
    // socket.on("disconnect", () => {
    //   console.log("user disconnected");
    // });
  });
};
