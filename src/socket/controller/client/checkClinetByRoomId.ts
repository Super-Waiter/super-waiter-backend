import { Client } from "../../../model/Client";
import { CLIENT_STATUS } from "../../../types";
import { SocketType } from "../../type";

export const checkClientByRoomId = (socket: SocketType) => {
  return socket.on("check-client-by-room-id", async (id) => {
    try {
      const client = await Client.findOne({
        where: { room: id, status: CLIENT_STATUS.ACTIVE },
      });
      console.log(client);

      if (client !== null) {
        socket.emit("client-checked-by-room-id", true);
      } else {
        socket.emit("client-checked-by-room-id", false);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
