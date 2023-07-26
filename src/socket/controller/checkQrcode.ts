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
import { SocketType } from "../type";

export const checkQrcodeBySocket = (socket: SocketType) => {
  return socket.on("check-qrCode", async (data) => {
    // Get the recipient's socket by their user ID

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

        socket.emit("qrCode-checked", socket.id);

        // Broadcast the event to all connected users except the sender
        console.log(client.dataValues);

        socket.broadcast.emit("client-created", client.dataValues);
        socket.emit("client-created", client.dataValues);
        socket.broadcast.emit("room-busy", checkRoom.id);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
