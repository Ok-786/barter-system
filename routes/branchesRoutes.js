import express from "express";
import multer from 'multer';

import { getAllBranchesById, registerBranch, updateBranch } from "../controllers/branchesController.js";

const storage = multer.memoryStorage();
const router = express.Router();

router.get('/:id', getAllBranchesById);
router.post('/register', multer({ storage: storage }).single('file'), registerBranch);
router.patch('/update/:id', multer({ storage: storage }).single('file'), updateBranch);

export default router;

