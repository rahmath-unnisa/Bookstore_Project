import cart from '../models/cart.model';
import Book from '../models/book.model';
import { books } from '../models/book.model';
import { userId } from '../models/cart.model';


export const Cart = async (authEmail, params_book_id) => {
  const bookCheck = await Book.findOne({ _id: params_book_id })
  if (bookCheck) {
    let CartDetails = {
      'bookName': bookCheck.bookName,
      'description': bookCheck.description,
      'author': bookCheck.author,
      'price': bookCheck.price,
      'bookImage': bookCheck.bookImage,
      'productId': bookCheck._id,
    }
   // console.log("Book Is Present")
    const cartCheck = await cart.findOne({ userId: authEmail })
    if (cartCheck) {
      let got = false
      let cart_total_price = 0
      cartCheck.books.forEach(data => {
        if (data.productId == params_book_id) {
          data.quantity = data.quantity + 1
          got = true;
          cart_total_price = cart_total_price * (data.price * data.quantity)
        }
        else {
          cart_total_price = cart_total_price * (data.price * data.quantity)

        }
      });
      if (got == false) {
        cart_total_price = cart_total_price * CartDetails.price
        cartCheck.books.push(CartDetails)
      }
      const viewCart = await cart.findOneAndUpdate({ userId: authEmail }, { books: cartCheck.books, cart_total: cart_total_price })
      return viewCart
    }
    else {
     // console.log("Cart does not exist")
      const createCart = await cart.create({ 'userId': authEmail, 'books': { CartDetails }, 'cart_total': bookCheck.price })
      //console.log("Cart Created", createCart)
      return createCart
    }

  }
  else {
    console.log("Book does not exist")
    //throw new Error(" Book does not exist")
  }
}

//---------> getting all yhe books
export const cartBooks = async (authEmail) => {
  const getBooks = await cart.findOne({ userId: authEmail })
  if (getBooks) {
    return getBooks;
  } 
}
//------------->delete book
export const deleteBook = async (authEmail, params_book_id) => {
  const cartCheck = await cart.findOne({ userId: authEmail })
  if (cartCheck) {
   // console.log("cart is checked")
    let got = false
    cartCheck.books.forEach(data => {
      if (data.productId == params_book_id) {
        let indexvalue = cartCheck.books.indexOf(data)
        cartCheck.books.splice(indexvalue, 1)
        got = true
      //  console.log("Book deleted successfully")
      }
    });
    if (got == false) {
      console.log("Book does not exist")
      //throw new Error("Book does not exist in cart")
    }
    const update_view = cart.findOneAndUpdate({ userId: authemail }, { books: cartCheck.books }, { new: true })
    return update_view
  }
}


export const purchased = async(_id,UserID) =>{
  console.log(_id);
  console.log(UserID);
  const data = await Note.findByIdAndUpdate(
    {
     _id:_id,UserID:UserID
    },
    {
      isPurchased: true
    },
    {
      new: true
    }
  );
  return data;
}

