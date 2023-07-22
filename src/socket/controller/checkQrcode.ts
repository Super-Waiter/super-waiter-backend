import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../type";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../../model/Room";
import { User } from "../../model/User";
import {
  CLIENT_STATUS,
  ROOM_STATUS,
  Client as ClientType,
  Room as RoomType,
} from "../../types";
import { Client } from "../../model/Client";
import { Organisation } from "../../model/Organisation";

type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  any
>;

const connectedUsers: { [userId: string]: Socket } = {};

export const checkQrcodeBySocket = (socket: SocketType) => {
  return socket.on("check-qrCode", async (data) => {
    // Get the recipient's socket by their user ID
    const recipientSocket = connectedUsers[socket.id];

    try {
      const checkRoom = await Room.findOne({ where: { id: data.room } });
      const checkWaiter = await User.findOne({ where: { id: data.waiter } });
      const checkOrganisation = await Organisation.findOne({
        where: { id: data.organisation },
      });

      if (checkRoom && checkWaiter && checkOrganisation) {
        const newClient: ClientType = {
          waiter: data.waiter,
          room: data.room,
          status: CLIENT_STATUS.ACTIVE,
          organisation: data.organisation,
        };

        const updatedRoom: RoomType = {
          status: ROOM_STATUS.BUSY,
          name: checkRoom.name,
          organisation: checkRoom.organisation,
          client: checkRoom.organisation,
        };

        const client = await Client.create(newClient);
        await Room.update({ ...updatedRoom }, { where: { id: data.room } });

        recipientSocket.emit("qrCode-checked", socket.id);

        // Broadcast the event to all connected users except the sender
        recipientSocket.broadcast.emit("client-created", client);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        recipientSocket.broadcast.emit("room-busy", checkRoom.id);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
