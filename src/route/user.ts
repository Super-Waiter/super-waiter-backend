import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByPhoneNumber,
  removeUserById,
  updateUserById,
  updateUserByPhoneNumber,
} from "../controller/user";

const router = Router();

router.post("/createUser", createUser);
router.post("/updateUserById", updateUserById);
router.post("/updateUserByPhoneNumber", updateUserByPhoneNumber);
router.delete("/removeUserById/:id", removeUserById);

router.get("/getAllUsers", getAllUsers);
router.get("/getUserByPhoneNumber/:phone", getUserByPhoneNumber);
router.get("/getUserById/:id", getUserById);
router.get("/getUserByEmail/:email", getUserByEmail);

export default router;
