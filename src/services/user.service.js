import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

//get all users
export const userRegistration = async (body) => {
  console.log("Body before hashing", body)
   const saltRounds =10
   const hashpassword=await bcrypt.hash(body.password, saltRounds)
   console.log("Hashed password", hashpassword);
   body.password = hashpassword
   console.log("After hashing ",body)
   const data = await User.create(body);
   return data;
 };
 //------->Login
 
 export const Login = async (body) => {
     const result = await User.findOne({email:body.email});
   console.log(result)
   if (result != null)
   {
       const Pass = await bcrypt.compare(body.password,result.password);
         if(Pass){
       var token = jwt.sign({id: result._id, email :result.email},process.env.SECRETKEY);
       return token
     }
     else {
     throw new Error("Password is incorrect");
     }
   }
   else 
   throw new Error("Email does not exist");
 }
 