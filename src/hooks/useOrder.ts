import { useEffect, useState } from "react";
import { IOrder, IOrderItem, IOrderTableContent } from "../libs/utils/interfaces";
import { serviceGetOrdersData } from "../services/orders";
import { useLoading } from "./useLoading";


const useOrder = () => {
    const { loading, setLoading } = useLoading();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [ordersTableContent, setOrdersTableContent] = useState<IOrderTableContent[]>([]);

    const mapOrdersTableContent = (ordersData: any) => {
        const tableContent = ordersData.map((order: any, idx: number) => {
            return {
                no: idx + 1,
                id: order.id,
                user: order.user.name,
                items: order.items.map((item: IOrderItem) => {
                    return `${item.count} ${item.name}\n`
                }),
                deliveryMethod: order.deliveryMethod,
                paymentMethod: order.paymentMethod,
                discount: order.discountAmount,
                totalPayment: order.totalPayment,
                status: order.status
            }
        })
        setOrdersTableContent(tableContent);
    }

    const getOrdersData = async () => {
        setLoading(true);
        const response = await serviceGetOrdersData();
        setOrders(response);
        mapOrdersTableContent(response);
        setLoading(false);
    }

    useEffect(() => {
        getOrdersData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        loading,
        orders,
        ordersTableContent,

        getOrdersData,
        setOrders,
        setLoading,
        mapOrdersTableContent
    }

}


export default useOrder;