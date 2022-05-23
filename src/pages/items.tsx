import { NextPage } from 'next'
import Head from 'next/head'
import { Button, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FormItem, Modal, ViewTable } from '../components'
import { useItems } from '../hooks/useItems'
import { addItems, updateItem } from '../services/items'
import { useState } from 'react'
import { IHandleAddItem, IItem } from '../libs/utils/interfaces'

type IHandleEditItem = IHandleAddItem;

const tableCaption = 'Daftar Barang Partner-Petualang';
const tableHead = ['No', 'Nama Barang', 'Kategori', 'Diskon (%)', 'Harga Barang', 'Stock', 'Foto Barang', 'Aksi']

const Items: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { loading, items, tableContent, getItemData } = useItems()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editItemId, setEditItemId] = useState<string>('')
    const [initialValues, setInitialValues] = useState<IItem>({
        name: '',
        price: undefined,
        stock: undefined,
        category: '',
        discount: 0,
        description: '',
        image: undefined,
    })

    const handleAddItem = async ({ name, price, stock, category, discount, description, image, actions }: IHandleAddItem) => {
        await addItems({ name, price, stock, category, discount, description, image })
        actions.setSubmitting(false)
        onClose()
        await getItemData()
    }

    const handleEditItem = async ({ name, price, stock, category, discount, description, image, actions }: IHandleEditItem) => {
        await updateItem({ name, price, stock, category, discount, description, image, editItemId })
        actions.setSubmitting(false)
        onClose()
        await getItemData()
    }

    const handleClickEdit = (id: string) => {
        setEditItemId(id)
        const item = items.find((item: IItem) => item.id === id)
        setInitialValues({
            ...initialValues,
            name: item?.name,
            price: item?.price,
            stock: item?.stock,
            category: item?.category,
            discount: item?.discount,
            description: item?.description,
            image: item?.image,
        })
        setIsEdit(true)
        onOpen()
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="LuxSpace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <VStack alignItems='start' spacing='5' background='white' w='full' maxW='full' h='full' p='4'>
                    <HStack justifyContent='space-between' w='full' alignItems='center' my='3'>
                        <Text fontSize='xl' fontWeight='bold' >Daftar Barang</Text>
                        <Button colorScheme='blue' onClick={onOpen}>Tambh Barang</Button>
                    </HStack>
                    <ViewTable loading={loading} caption={tableCaption} contents={tableContent} headers={tableHead} handleClickEdit={handleClickEdit} />
                </VStack>
            </main>
            <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Barang' : 'Tambah Barang'} showBottomAction={false}>
                <FormItem key={initialValues.name} onClose={onClose} handleAddItem={handleAddItem} initialValues={initialValues} isEdit={isEdit} handleEditItem={handleEditItem} />
            </Modal>
        </>
    )
}

export default Items