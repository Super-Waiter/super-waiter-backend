import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUsersByOrganisaton,
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
router.get("/getUserByOrganisation/:organisation", getUsersByOrganisaton);

export default router;
