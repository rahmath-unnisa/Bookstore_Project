import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//------>adding book to the wishlist
router.post('/:_id',userAuth,wishlistController.wish);

//------>deleting book from the wishlist
router.put('/:_id', userAuth, wishlistController.deleteBook)


export default router;