import wishlist from '../models/cart.model';
import Book from '../models/book.model';





export const wish = async (authMail, param_book_id) => {
    const bookCheck = await Book.findOne({ _id: param_book_id })
    if (bookCheck) {
        let information = {
            'bookName': bookCheck.bookName,
            'description': bookCheck.description,
            'author': bookCheck.author,
            'price': bookCheck.price,
            'bookImage': bookCheck.bookImage,
            'productId': bookCheck._id,
        }
        const listCheck = await wishlist.findOne({ userId: authMail })
        if (listCheck) {
            let got = false;
            listCheck.books.forEach(data => {
                if (data.productId == param_book_id) {
                    data.quantity = data.quantity + 1
                    got = true;
                }
            });
            if (got == false) {
                listCheck.books.push(information)
            }
            const Viewlist = await wishlist.findOneAndUpdate({ userId: authMail }, { books: listCheck.books }, { new: true });
            return Viewlist
        } else {

            const newlist = await wishlist.create({ 'userId': authMail, 'books': [information] })
            console.log("createwishlist", newlist)
            return newlist
        }


    } else {
        console.log("Book does not exist")
        //throw new Error("Book Is Not Exist")
    }
}

//------------------->Remove bookfrom wishlist

export const deleteBooks = async (authEmail, params_book_id) => {
    const listCheck = await wishlist.findOne({ userId: authEmail })
    if (listCheck) {
    
      let got = false
      listCheck.books.forEach(data => {
        if (data.productId == params_book_id) {
          let indexvalue = listCheck.books.indexOf(data)
          listCheck.books.splice(indexvalue, 1)
          got = true
          console.log("Book removed from wishlist")
        }
      });
      if (got == false) {
        throw new Error("Book does not present in wishlist")
      }
  
      const Viewlist = wishlist.findOneAndUpdate({ userId: authEmail }, { books: listCheck.books }, { new: true })
      return Viewlist
    } else {
      console.log("book does not exist ")
      //throw new Error("User wishlist is not exist")
    }
  }
