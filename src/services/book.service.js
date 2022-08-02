import book from '../models/book.model';


// export const addNote = async (body) => {
//   console.log(body);
//   const data = await Note.create(body);
//   if(data){
//     await client.del('AddNote');
//   }
//   return data;
//   };
  export const getAllBooks = async(body) => {
    const data = await book.find({UserID:body.UserID});
    return data;
  };
  export const getBook= async (_id) => {
    const data = await book.findById(_id);
    return data;
  };