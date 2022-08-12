import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

export const wish = async (req, res, next) => {
    try {
        const data = await WishlistService.wish(req.body.email, req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book Added To The Wishlist'
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
        const data = await WishlistService.deleteBooks(req.body.email, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
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
