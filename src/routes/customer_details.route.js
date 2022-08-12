import express from 'express';
import * as customerContoller from '../controllers/customer_detals.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { customerDetailsValidator } from '../validators/customer_details.validator';



const router = express.Router();

router.post('', customerDetailsValidator, userAuth, customerContoller.customerDetails);

export default router;