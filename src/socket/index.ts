import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// Define custom event names
type CustomEvents = {
  "user-joined": (userId: string) => void;
  "send-message": (message: string, userId: string) => void;
  "receive-message": (message: string) => void;
};

type SocketType = Server<CustomEvents, CustomEvents, DefaultEventsMap>;

const connectedUsers: { [userId: string]: Socket } = {};

export const useSocket = (io: SocketType) => {
  io.on("connection", (socket) => {
    connectedUsers[socket.id] = socket;

    // Handle custom event "user-joined"
    socket.on("user-joined", (userId: string) => {
      // Broadcast the event to all connected users except the sender
      socket.broadcast.emit("user-joined", userId);
    });

    // Handle custom event "send-message"
    socket.on("send-message", (message: string, userId: string) => {
      // Get the recipient's socket by their user ID
      const recipientSocket = connectedUsers[userId];

      // If the recipient socket exists, emit the event to the recipient only
      if (recipientSocket) {
        recipientSocket.emit("receive-message", message);
      }
    });

    // Disconnect client
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
