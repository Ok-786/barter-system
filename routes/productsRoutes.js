import express from "express";
import { getAllProducts, getCurrentUserProducts, registerProducts, searchItem, updateProducts } from "../controllers/productsController.js";
import multer from 'multer'

const storage = multer.memoryStorage();
const router = express.Router();

router.get('/search/searched', searchItem);
// router.get('/:id', getGiftsById);
router.post('/register', multer({ storage: storage }).single('file'), registerProducts);
router.patch('/update', updateProducts);
router.get('/:id', getCurrentUserProducts);
router.get('/', getAllProducts);
// router.delete('/delete/:id', deleteGifts);

export default router;

