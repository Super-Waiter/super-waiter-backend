import { Router } from "express";
import {
  createFakeData,
  createRoom,
  getAllRooms,
  getRoomById,
  getRoomsByOrganisation,
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
router.get("/getRoomsByOrganisation/:organisation", getRoomsByOrganisation);

export default router;
