import express from "express";

import { getAllUsers, searchItem } from "../controllers/deleteusersController.js";

const router = express.Router();

router.get('/', getAllUsers);
router.get('/search', searchItem);

export default router;

