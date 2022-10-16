import express from "express";
import { deleteVendor, getAllVendors, getVendorById, registerVendor, searchItem, updateVendor } from "../controllers/vendorsController.js";
import multer from 'multer'

const storage = multer.memoryStorage();
const router = express.Router();

router.get('/:id', getAllVendors);
router.get('/search/searched', searchItem);
// router.get('/:id', getVendorById);
router.post('/register', multer({ storage: storage }).single('file'), registerVendor);
router.patch('/update', updateVendor);
router.delete('/delete/:id', deleteVendor);

export default router;

