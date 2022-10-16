import express from "express";

import { getPayoutsByID } from "../controllers/payoutsController.js";

const router = express.Router();

router.get('/:iban', getPayoutsByID);

export default router;

