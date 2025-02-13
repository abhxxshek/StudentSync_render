import { jwtDecode } from "jwt-decode";

function decodeToken(){
    const token=sessionStorage.getItem('logintoken');
    let role=null;
    if(token){
        try{
            const decodedToken=jwtDecode(token);
            role=decodedToken.role;
        }catch(error){
            console.log("Invalid Token ",error);
        }
        
    }
}

export default role