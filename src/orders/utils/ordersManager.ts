import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import i18n from 'i18next';
import { getCompany, updateCompany } from "../../company/utils/companiesManager";
import { db } from "../../firebase";
import { IOrder } from "../components/OrderMiniature";

export const addOrder = async(order: IOrder, companyId: string) => {
    const company = await getCompany(companyId)
    if(!company) return
    const newOrder = {
        company: companyId,
        isClosed: order.isClosed, 
        title: `${i18n.t("order_title", {clientName: order.client.name})}`, 
        description: order.description, 
        deliveryDate: order.deliveryDate, 
        client: order.client,
        price: order.price || null,
        orderNumber: company.ordersNumber + 1 || 1
    }
    await addDoc(collection(db, 'orders'), newOrder)
    await updateCompany({...company, ordersNumber: company?.ordersNumber + 1})
}

export const getOrders = async(company: string) => {
    console.log(`company: ${company}`)
    const q = query(collection(db, 'orders'), where('company', "==", company) ,orderBy('deliveryDate'))
    const querySnapshot = await getDocs(q)
    let orders: IOrder[] = []
    querySnapshot.forEach((doc) => {
        orders.push(
            {
                id: doc.id,
                isClosed: doc.data().isClosed,
                title: doc.data().title,
                description: doc.data().description,
                deliveryDate: doc.data().deliveryDate,
                client: doc.data().client,
                price: doc.data().price || null,
                orderNumber: doc.data().orderNumber
            }
        )
    });
    return orders
}

export const updateOrder = async(order: IOrder) => {
    await updateDoc(doc(db, "orders", order.id), {
        id: order.id,
        isClosed: order.isClosed,
        title: order.title,
        description: order.description,
        deliveryDate: order.deliveryDate,
        client: order.client,
        price: order.price || null,
        orderNumber: order.orderNumber
    })
}

export const deleteOrder = async(orderId: string) => {
    await deleteDoc(doc(db, 'orders', orderId))
}

export const ordersSnapshot = (company: string | undefined, update: (orders: IOrder[]) => void) => {
    if(company === undefined) return
    const q = query(collection(db, "orders"), where("company", "==", company), orderBy('deliveryDate'));
    onSnapshot(q, (querySnapshot) => {
    const orders: IOrder[] = [];
    querySnapshot.forEach((doc) => {
        orders.push(
            {
                id: doc.id,
                isClosed: doc.data().isClosed,
                title: doc.data().title,
                description: doc.data().description,
                deliveryDate: doc.data().deliveryDate,
                client: doc.data().client,
                price: doc.data().price || null,
                orderNumber: doc.data().orderNumber
            }
        );
    });
    update(orders)
    });
}

