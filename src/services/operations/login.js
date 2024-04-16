import { apiconnnector } from "../apiconnector";
import { auth } from "../apis";

export const login =async(email, password, navigate)=>{
    try{
        const response=await apiconnnector("GET", auth.LOGIN_API,{
            email,
            password,
        });

        console.log(response.data)
    }

    catch(err){
        console.log(err.message);
    }
}