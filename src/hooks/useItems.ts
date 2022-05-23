import { useEffect, useState } from "react"
import { IItem, ITableContent } from "../libs/utils/interfaces"
import { getAllItems } from "../services/items"
import { useLoading } from "./useLoading"

export const useItems = () => {
    const [items, setItems] = useState<IItem[]>([])
    const [tableContent, setTableContent] = useState<ITableContent[]>([])
    const { loading, setLoading } = useLoading()

    const getItemData = async () => {
        setLoading(true)
        const responseItems = await getAllItems()
        setItems(responseItems)
        const tableContent = responseItems.map((item: IItem, idx: number) => {
            return {
                no: idx + 1,
                id: item.id,
                name: item.name,
                price: item.price,
                category: item.category,
                discount: item.discount,
                stock: item.stock,
                image: item.image,
            }
        })
        setTableContent(tableContent)
        setLoading(false)
    }

    useEffect(() => {
        getItemData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        loading,
        setLoading,

        items,
        setItems,
        tableContent,
        setTableContent,

        getItemData,
    }
}