import { Box, Divider, HStack, Text, useDisclosure, VStack, AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogBody, Button, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react';
import { ViewTableTransaction } from '../components';
import PModal from '../components/PModal';
import useOrder from '../hooks/useOrder';
import { statusTransaction } from '../libs/utils/helper';
import { IHandleOpenAlertUpdateStatusProps, IOrder, IOrderItem } from '../libs/utils/interfaces';
import { serviceUpdateOrderStatus } from '../services/orders';
const tableCaption = 'Daftar Transaksi Partner-Petualang';
const tableHead = ['No', 'User', 'Barang', 'Pengiriman', 'Pembayaran', 'Diskon', 'Total Pembayaran', 'Status', 'Aksi'];


const Transaction: NextPage = () => {

    const { loading, orders, ordersTableContent, setOrders, mapOrdersTableContent } = useOrder();
    const {
        isOpen: isOpenUpdateStatusModal,
        onOpen: onOpenUpdateStatusModal,
        onClose: onCloseUpdateStatusModal
    } = useDisclosure();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    const [detailTransaction, setDetailTransaction] = useState<IOrder>({});
    const [idTransactionWillUpdate, setIdTransactionWillUpdate] = useState<string>('');
    const [nextStatus, setNextStatus] = useState<string>('');
    const confirmChangeRef = useRef();

    const handleOpenAlertUpdateStatus = ({ id, status }: IHandleOpenAlertUpdateStatusProps) => {
        if (status === statusTransaction.ON_PROCESS) {
            setNextStatus(statusTransaction.RENTED)
        } else {
            setNextStatus(statusTransaction.DONE)
        }
        setIdTransactionWillUpdate(id);
        onOpenUpdateStatusModal();
    }

    const handleCloseAlertUpdateStatus = () => {
        onCloseUpdateStatusModal();
        setIdTransactionWillUpdate('');
    }

    const handleClickEditStatusTransaction = async () => {
        await serviceUpdateOrderStatus(idTransactionWillUpdate, nextStatus);
        const order: IOrder = orders.find((dataOrder: IOrder) => dataOrder.id === idTransactionWillUpdate)!;
        const newOrders: Array<IOrder> = orders.filter((dataOrder: IOrder) => dataOrder.id !== idTransactionWillUpdate);
        if (order) order.status = nextStatus;
        setOrders([...newOrders, order]);
        mapOrdersTableContent(orders);
        onCloseUpdateStatusModal();
        setIdTransactionWillUpdate('');
        toast({
            title: 'Status Transaksi Terubah.',
            description: `Status transaksi berhasil diubah menjasi "${nextStatus}"`,
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true,
        })
    }

    const handleClickDetailTransaction = (id: string) => {
        const order: IOrder = orders.find((dataOrder: IOrder) => dataOrder.id === id)!;
        setDetailTransaction(order);
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
                <VStack alignItems='start' spacing='4' background='white' w='full' maxW='full' h='full' p='4'>
                    <Text fontSize='xl' fontWeight='bold' >Daftar Transaksi</Text>
                    <ViewTableTransaction
                        loading={loading}
                        caption={tableCaption}
                        contents={ordersTableContent}
                        headers={tableHead}
                        handleClickDetailTransaction={handleClickDetailTransaction}
                        handleOpenAlertUpdateStatus={handleOpenAlertUpdateStatus}
                    />
                </VStack>
                <PModal isOpen={isOpen} onClose={onClose} showBottomAction={false} title='Detail transaksi' >
                    <VStack spacing='3' w='full'>
                        <HStack>
                            <VStack flex='1'>
                                <Box alignSelf='start'>
                                    <Text fontSize='sm' textAlign='left'>User:</Text>
                                    <Text fontSize='sm' fontWeight='bold'>{detailTransaction.user?.name}</Text>
                                </Box>
                                <Box alignSelf='start'>
                                    <Text fontSize='sm' textAlign='left'>Email:</Text>
                                    <Text fontSize='sm' fontWeight='bold'>{detailTransaction.user?.email}</Text>
                                </Box>
                                <Box alignSelf='start'>
                                    <Text fontSize='sm' textAlign='left'>HP:</Text>
                                    <Text fontSize='sm' fontWeight='bold'>{detailTransaction.user?.phone}</Text>
                                </Box>
                            </VStack>
                            <Box flex='1'>
                                <Text fontSize='sm' textAlign='left'>Alamat:</Text>
                                <Text fontSize='sm' fontWeight='bold'>{detailTransaction.user?.address}</Text>
                            </Box>
                        </HStack>
                        <Divider orientation='horizontal' color='gray.900' />
                        <HStack>
                            <Box alignSelf='start' flex='1' >
                                <Text fontSize='sm' textAlign='left'>Barang:</Text>
                                {
                                    detailTransaction.items?.map((item: any) => {
                                        return (
                                            <Box key={item.id}>
                                                <Text fontSize='sm' fontWeight='bold'>{`${item.count} ${item.name}`}</Text>
                                                <Text fontSize='xs' >{`Catatan: ${item.note || '-'}`}</Text>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                            <VStack justifyContent='start' flex='1'>
                                <Box alignSelf='start'>
                                    <Text fontSize='sm' textAlign='left'>Pengambilan barang:</Text>
                                    <Text fontSize='sm' fontWeight='bold'>{detailTransaction?.deliveryMethod}</Text>
                                </Box>
                                <Box alignSelf='start'>
                                    <Text fontSize='sm' textAlign='left'>Metode pembayaran:</Text>
                                    <Text fontSize='sm' fontWeight='bold'>{detailTransaction?.paymentMethod}</Text>
                                </Box>
                                <Box alignSelf='start'>
                                    <Text fontSize='sm' textAlign='left'>Diskon:</Text>
                                    <Text fontSize='sm' fontWeight='bold'>{detailTransaction?.discountAmount}</Text>
                                </Box>
                            </VStack>
                        </HStack>
                        <Divider orientation='horizontal' color='gray.900' />
                        <Box alignSelf='start'>
                            <Text fontSize='sm' textAlign='left'>Status:</Text>
                            <Text fontSize='sm' fontWeight='bold'>{detailTransaction?.status}</Text>
                        </Box>
                        <Box alignSelf='start'>
                            <Text fontSize='sm' textAlign='left'>Total Pembayaran:</Text>
                            <Text fontSize='2xl' fontWeight='bold'>{detailTransaction?.totalPayment}</Text>
                        </Box>
                    </VStack>
                </PModal>
                <AlertDialog
                    isOpen={isOpenUpdateStatusModal}
                    leastDestructiveRef={confirmChangeRef}
                    onClose={handleCloseAlertUpdateStatus}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Update Status Transaksi
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                {` Anda yakin memperbarui status transaksi ini menjadi "${nextStatus}" ?`}
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button onClick={handleCloseAlertUpdateStatus}>
                                    Batal
                                </Button>
                                <Button ref={confirmChangeRef} colorScheme='linkedin' onClick={handleClickEditStatusTransaction} ml={3}>
                                    Ubah
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </main>
        </>
    )
}

export default Transaction
