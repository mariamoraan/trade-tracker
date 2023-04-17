import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export interface ICompany {
    ownerId: string,
    name: string,
    employees: string[],
    id: string,
    ordersNumber: number,
}

export const addCompany = async(company: ICompany): Promise<string> => {
    let id = `${company.id}${Date.now()}`
    const companyRef = doc(db, 'companies', id);
    await setDoc(companyRef, {...company, id: id});
    return companyRef.id
}

export const updateCompany = async(company: ICompany) => {
    await updateDoc(doc(db, "companies", company.id), {
        ownerId: company.ownerId,
        name: company.name,
        employees: company.employees,
        id: company.id
    })
}

export const getCompany = async(id: string) =>  {
    const ref = doc(db, "companies", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
    const company = docSnap.data();
    return company as ICompany
    } else {
    return null
    }
}

export const companySnapshot = async(companyId: string, update: (company: ICompany) => void) => {
    let company = await getCompany(companyId)
    if (!company) return
    update(company)
}