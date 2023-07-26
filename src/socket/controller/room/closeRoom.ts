import { Client } from "../../../model/Client";
import { SocketType } from "../../type";
import {
  CLIENT_STATUS,
  Client as ClientType,
  ROOM_STATUS,
  Room as RoomType,
} from "../../../types";
import { Room } from "../../../model/Room";

export const closeRoom = (socket: SocketType) => {
  return socket.on("close-room", async (id) => {
    const client = await Client.findOne({
      where: { room: id, status: CLIENT_STATUS.ACTIVE },
    });
    const room = await Room.findOne({ where: { id } });

    if (room != null) {
      const newRoom = {
        ...room.dataValues,
        status: ROOM_STATUS.EMPTY,
      } as RoomType;

      socket.emit("room-updated", newRoom);
      await Room.update({ ...newRoom }, { where: { id: id } });
    }

    if (client !== null) {
      const newClient = {
        ...client.dataValues,
        status: CLIENT_STATUS.INACTIVE,
      } as ClientType;

      if (newClient.id !== undefined) {
        socket.broadcast.emit("client-closed", newClient.id);
        socket.emit("client-closed", newClient.id);

        console.log(newClient);
      }

      await Client.update({ ...newClient }, { where: { id: newClient.id } });
    }
  });
};
