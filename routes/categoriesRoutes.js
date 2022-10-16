import express from "express";
import { deleteCategory, getAllCategories, getCategoryById, getParentCategories, registerCategory, searchItem, updateCategory } from "../controllers/categoriesController.js";
import multer from 'multer'

const storage = multer.memoryStorage();
const router = express.Router();

router.get('/parent', getParentCategories);
router.get('/all/:id', getAllCategories);

router.get('/all/search/searched', searchItem);
// router.get('/:id', getCategoryById);
router.post('/register', multer({ storage: storage }).single('file'), registerCategory);
router.patch('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

export default router;

