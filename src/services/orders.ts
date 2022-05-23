

import { db } from '../../firebase/clientApp'
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";


export const serviceGetOrdersData = async () => {
    const queryOrders = query(collection(db, "orders"));
    const querySnapshot = await getDocs(queryOrders);
    const ordersData: any = []
    querySnapshot.forEach((doc) => {
        const item = {
            id: doc.id,
            ...doc.data()
        }
        ordersData.push(item)
    });
    return ordersData
}


export const serviceUpdateOrderStatus = async (id: string, status: string) => {
    const orderDoc = doc(db, 'orders', id)
    updateDoc(orderDoc, {
        status: status,
    }).then((response) => console.log(response))
}