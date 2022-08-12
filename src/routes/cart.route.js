import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();
//------>creatind the cart
router.post('/:_id',userAuth,cartController.cart)

//------>deleting book from cart
router.put('/:_id', userAuth, cartController.deleteBook)

//-------->getting all books
router.get('',userAuth, cartController.AllBooks);

//------>purchasing a book
router.put('/:_id/isPurchase', userAuth, cartController.purchased);








export default router;