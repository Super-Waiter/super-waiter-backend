import { Client } from "../../../model/Client";
import { CLIENT_STATUS } from "../../../types";
import { SocketType } from "../../type";

export const checkClient = (socket: SocketType) => {
  return socket.on("check-client", async (id) => {
    try {
      const findClient = await Client.findOne({
        where: { id, status: CLIENT_STATUS.ACTIVE },
      });

      if (findClient != null) {
        socket.emit("client-checked", true);
      } else {
        socket.emit("client-checked", false);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
