import express from "express";

import { loginUser, signupAdmin, updateWishList } from "../controllers/usersController.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupAdmin);
router.post('/wishlist/update', updateWishList);

export default router;

