import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

export interface ICompany {
    ownerId: string,
    name: string,
    employees: string[],
    id: string,
    ordersNumber: number,
    companyMessage: string
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
        id: company.id,
        companyMessage: company.companyMessage,
        ordersNumber: company.ordersNumber
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
    const q = query(collection(db, "companies"), where("id", "==", companyId));
    onSnapshot(q, (querySnapshot) => {
    const companies: ICompany[] = [];
    querySnapshot.forEach((doc) => {
        companies.push(
            {
                ownerId: doc.data().ownerId,
                name: doc.data().name,
                employees: doc.data().employees,
                id: doc.data().id,
                companyMessage: doc.data().companyMessage,
                ordersNumber: doc.data().ordersNumber
            }
        );
    });
    update(companies[0])
    });
}