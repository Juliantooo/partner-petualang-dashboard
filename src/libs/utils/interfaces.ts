import { IconType } from "react-icons"
import { string } from "yup"

export interface IItem {
    id?: string,
    name?: string,
    price?: number,
    stock?: number,
    category?: string
    discount?: number,
    description?: string,
    image?: any,
}

export interface IHandleAddItem extends IItem {
    actions: any
}


export interface IEditItemsProps extends IItem {
    editItemId: string,
}

export interface ITableContent {
    id: string,
    no: number,
    name: string,
    price: number,
    stock: number,
    image: string,
    category: string,
    discount: number,
}

export interface IOrderItem extends IItem {
    count?: number,
    note?: string,
    rented?: number
}

export interface IUser {
    address?: 'string',
    email?: 'string',
    id?: 'string',
    image?: 'string',
    name?: 'string',
    password?: 'string',
    phone?: 'string',
}

export interface IOrder {
    id?: string,
    deliveryMethod?: string,
    paymentMethod?: string,
    status?: string,
    discountAmount?: number,
    totalPayment?: string,
    user?: IUser,
    items?: Array<IOrderItem>
}

export interface IOrderTableContent {
    no: number,
    id: string,
    user: string,
    items: string[],
    deliveryMethod: string,
    paymentMethod: string,
    status: string,
    discount: number,
    totalPayment: number,
}

export interface IHandleOpenAlertUpdateStatusProps {
    id: string,
    status: string
}

export interface ICardRecapProps {
    icon: IconType,
    title: string,
    value: string | number,
    bgColor: string
}