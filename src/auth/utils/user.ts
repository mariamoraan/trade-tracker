import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';

export type OnboardStateType = "CREATE_COMPANY" | "FINISHED" | "JOIN_COMPANY"

export const OnboardStateTypes = {
    CREATE_COMPANY: "CREATE_COMPANY",
    JOIN_COMPANY: "JOIN_COMPANY",
    FINISHED: "FINISHED"
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    onboardState: OnboardStateType,
    company?: string,
}

export const addUser= async(user: IUser) => {
    try {
        const userRef = doc(db, 'users', user.id);
        await setDoc(userRef, user);
    } catch(error) {
        console.log(error)
    }
};

export const getUser = async(id: string) =>  {
    const ref = doc(db, "users", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
    const user = docSnap.data();
    return user as IUser
    } else {
    return null
    }
}

export const updateUser = async(user: IUser) => {
    await updateDoc(doc(db, "users", user.id), {
        id: user.id,
        name: user.name,
        email: user.email,
        onboardState: user.onboardState,
        company: user.company,
    })
}

export const userSnapshot = async(userId: string, update: (user: IUser) => void) => {
    if (!userId) return
    const user = await getUser(userId)
    if (!user) return
    update(user)
}


