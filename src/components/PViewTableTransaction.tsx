import { SkeletonText, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, HStack, Skeleton } from '@chakra-ui/react'
import {
    MdOutlineModeEditOutline
} from 'react-icons/md';
import {
    BsInfoLg
} from 'react-icons/bs';
import { formatPrice } from '../libs/utils/formatter';
import { statusTransaction } from '../libs/utils/helper';
import { IHandleOpenAlertUpdateStatusProps, IOrderTableContent } from '../libs/utils/interfaces';

interface IViewTableTransactionProps {
    caption: string,
    headers?: Array<string>,
    contents?: Array<IOrderTableContent>,
    loading: boolean,
    handleOpenAlertUpdateStatus: ({ id, status }: IHandleOpenAlertUpdateStatusProps) => void
    handleClickDetailTransaction: (id: string) => void
}

const ViewTableTransaction: React.FC<IViewTableTransactionProps> = ({ caption, headers, contents, loading, handleOpenAlertUpdateStatus, handleClickDetailTransaction }) => {
    return (
        <TableContainer w='full'>
            <Table size='md' variant='striped' colorScheme='telegram'>
                <TableCaption>{caption}</TableCaption>
                <Thead>
                    <Tr>
                        {
                            headers?.map((head) => <Th key={head}>{head}</Th>)
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        !loading ? contents?.map((content) => (
                            <Tr key={content.id}>
                                <Td>{content.no}</Td>
                                <Td>{content.user}</Td>
                                <Td whiteSpace='pre-line' >{content.items}</Td>
                                <Td>{content.deliveryMethod}</Td>
                                <Td>{content.paymentMethod}</Td>
                                <Td>{formatPrice(content.discount)}</Td>
                                <Td>{formatPrice(content.totalPayment)}</Td>
                                <Td>{content.status}</Td>
                                <Td>
                                    <HStack>
                                        <IconButton
                                            isDisabled={content.status === statusTransaction.DONE}
                                            colorScheme='blue'
                                            aria-label='Action'
                                            onClick={() => handleOpenAlertUpdateStatus({ id: content.id, status: content.status })}
                                            icon={<MdOutlineModeEditOutline />}
                                        />
                                        <IconButton
                                            colorScheme='blue'
                                            onClick={() => handleClickDetailTransaction(content.id)}
                                            aria-label='Action'
                                            icon={<BsInfoLg />}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>
                        ))
                            :
                            headers?.map((_, idx) => (
                                <Tr key={idx}>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td><SkeletonText /></Td>
                                    <Td  >
                                        <HStack spacing='3' alignItems='center'>
                                            <Skeleton h='10' w='10' />
                                            <Skeleton h='10' w='10' />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ViewTableTransaction