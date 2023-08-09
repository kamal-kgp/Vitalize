import {auth} from './cognito';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signin = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password).then(res=>{
        return res.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
}

export const getcurrentuser = ()=>{
    // auth.currentUser()
}