import { Router } from "express";
import {
  createOrganisation,
  deleteOrganisation,
  getOrganisationById,
  getOrganisations,
  updateOrganisation,
} from "../controller/organisation";

const router = Router();

router.post("/createOrganisation", createOrganisation);
router.get("/getOrganisations", getOrganisations);
router.get("/getOrganisationById/:id", getOrganisationById);
router.put("/updateOrganisation/:id", updateOrganisation);
router.delete("/deleteOrganisation/:id", deleteOrganisation);

export default router;
