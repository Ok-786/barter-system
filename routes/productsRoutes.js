import express from "express";
import { getAllProducts, getCurrentUserProducts, postNewBid, registerProducts, searchItem, updateProducts } from "../controllers/productsController.js";
import multer from 'multer'
import fileUpload from '../middleware/file-Upload.js';


const storage = multer.memoryStorage();
const router = express.Router();

router.get('/', getAllProducts);
router.post('/register', fileUpload.fields([
    {
        name: 'file1', maxCount: 1
    },
    {
        name: 'file2', maxCount: 1
    },
    {
        name: 'file3', maxCount: 1
    },
    {
        name: 'file4', maxCount: 1
    }
]), registerProducts);
router.post('/bid/:id', fileUpload.single('file'), postNewBid);



router.get('/search/searched', searchItem);
// router.get('/:id', getGiftsById);
router.patch('/update', updateProducts);
router.get('/:id', getCurrentUserProducts);
// router.delete('/delete/:id', deleteGifts);

export default router;

