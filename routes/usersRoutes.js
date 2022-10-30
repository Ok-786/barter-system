import express from "express";

import { getAllUsers, getChats, getEnabledUsers, isReported, loginUser, reportAction, sendMessage, setEnabledUsers, signupAdmin, updateReportedUser, updateWishList } from "../controllers/usersController.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupAdmin);
router.post('/wishlist/update', updateWishList);
router.post('/report', updateReportedUser);
router.post('/getreport', isReported);
router.post('/reportaction', reportAction);
router.get('/', getAllUsers);
router.post('/chat/enable/:id', setEnabledUsers);
router.get('/chat/enable/:id', getEnabledUsers);
router.post('/chats/:id', sendMessage);
router.get('/chats', getChats);

export default router;

