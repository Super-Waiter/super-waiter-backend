import { Router } from "express";
import {
  createClient,
  deleteClientById,
  getClientById,
  getClients,
} from "../controller/client";

const router = Router();

router.post("/createClient", createClient);
router.post("/deleteClientById/:id", deleteClientById);

router.get("/getClientById/:id", getClientById);
router.get("/getClients", getClients);

export default router;
