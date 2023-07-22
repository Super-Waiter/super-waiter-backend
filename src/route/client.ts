import { Router } from "express";
import {
  createClient,
  deleteClientById,
  getClientById,
} from "../controller/client";

const router = Router();

router.post("/createClient", createClient);
router.post("/getClientById/:id", getClientById);
router.post("/deleteClientById/:id", deleteClientById);

export default router;
