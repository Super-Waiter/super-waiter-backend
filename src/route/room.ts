import { Router } from "express";
import {
  createFakeData,
  createRoom,
  getAllRooms,
  getRoomById,
  getRooms,
  getRoomsBySearch,
  getRoomsForUser,
  removeItemById,
} from "../controller/room";

const router = Router();

router.post("/createRoom", createRoom);
router.post("/createFakeData", createFakeData);
router.delete("/removeRoomById/:id", removeItemById);
router.get("/getRooms", getRooms);
router.get("/getAllRooms", getAllRooms);
router.get("/getRoomsBySearch", getRoomsBySearch);
router.get("/getRoomsForUser/:userId", getRoomsForUser);
router.get("/getRoomById/:id", getRoomById);

export default router;
