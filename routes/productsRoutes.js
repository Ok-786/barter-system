import express from "express";
import { acceptBid, deleteFeedback, deleteProducts, editFeedback, getAllFeedback, getAllProducts, postFeedback, postNewBid, registerProducts, searchItem, updateProducts } from "../controllers/productsController.js";
import fileUpload from '../middleware/file-Upload.js';


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
router.post('/edit/:id', fileUpload.single('file'), updateProducts);
router.post('/feedback/edit/:id', editFeedback);
router.delete('/feedback/delete/:id', deleteFeedback);
router.post('/feedback/:id', postFeedback);
router.get('/feedback', getAllFeedback);
router.delete('/delete/:id', deleteProducts);
router.post('/bid/accept/:id', acceptBid);




export default router;

