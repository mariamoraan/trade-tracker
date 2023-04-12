import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuthProvider } from "../../firebase";


export const firebaseSignUpWithEmailAndPassword = async(email: string, password: string) => {
    try {
        let res = await createUserWithEmailAndPassword(firebaseAuthProvider, email, password)
        return res.user.uid
    } catch(error) {
        console.log(error)
    }
}

export const firebaseSignInWithEmailAndPassword = async(email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(firebaseAuthProvider, email, password)
    } catch(error) {
        switch(error) {
            case "auth/user-not-found": 
                console.log("USER NOT FOUND")
                break
            default:
                console.log(error)
        }
    }
}

export const firebaseSignOut = async() => {
    const auth = getAuth()
    await signOut(auth)
}







