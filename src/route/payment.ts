import { Router } from "express";
import { createProduct, createSubscription } from "../controller/payze";

const router = Router();

router.post("/createProduct", createProduct);
router.post("/createSubscription", createSubscription);

export default router;
