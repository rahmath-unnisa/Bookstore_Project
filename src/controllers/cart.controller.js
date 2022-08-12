import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const cart = async (req, res, next) => {
    try {
        const data = await CartService.Cart(req.body.email, req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book Added To The Cart'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });

    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const data = await CartService.deleteBook(req.body.email, req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: "Book deleted Successfully"
        });
    }
    catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });


    }
}
export const AllBooks = async (req, res, next) => {
    try {
      const data = await CartService.cartBooks(req.body.Email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Cart details fatched sucessfully"
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

export const purchased = async(req,res,next) =>{
    try{
        const data = await CartService.purchased(req.params._id,req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data:data,
            message: 'Order successfully placed'
        });
    }catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });

    }
}



