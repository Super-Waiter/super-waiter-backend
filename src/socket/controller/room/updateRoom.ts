import { Room } from "../../../model/Room";
import { SocketType } from "../../type";

export const updateRoomBySocket = (socket: SocketType) => {
  return socket.on("edit-room", async (room) => {
    await Room.update({ ...room }, { where: { id: room.id } });

    socket.broadcast.emit("room-updated", room);
  });
};
