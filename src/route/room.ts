import { Router } from "express";
import {
  createFakeData,
  createItem,
  getAllItems,
  getItems,
  getItemsBySearch,
  getItemsForUser,
  removeItemById,
} from "../controller/room";

const router = Router();

router.post("/createRoom", createItem);
router.post("/createFakeData", createFakeData);
router.delete("/removeRoomById/:id", removeItemById);
router.get("/getRooms", getItems);
router.get("/getAllRooms", getAllItems);
router.get("/getRoomsBySearch", getItemsBySearch);
router.get("/getRoomsForUser", getItemsForUser);

export default router;
