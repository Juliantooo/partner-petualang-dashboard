import { Badge, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Image, SkeletonText, Skeleton } from '@chakra-ui/react'
import {
  MdOutlineModeEditOutline
} from 'react-icons/md';
import { formatPrice } from '../libs/utils/formatter';
import { ITableContent } from '../libs/utils/interfaces';

interface IViewTableProps {
  caption: string,
  headers?: Array<string>,
  contents?: Array<ITableContent>,
  loading: boolean,
  handleClickEdit: (id: string) => void
}

const ViewTable: React.FC<IViewTableProps> = ({ caption, headers, contents, handleClickEdit, loading }) => {
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
              <Tr key={content.name}>
                <Td>{content.no}</Td>
                <Td>{content.name}</Td>
                <Td>{content.category}</Td>
                <Td>{content.discount}</Td>
                <Td>{formatPrice(content.price)}</Td>
                <Td>{content.stock}</Td>
                <Td>
                  <Image src={content.image} alt={content.name} w='min' objectFit='cover' h='10' />
                </Td>
                <Td>
                  <IconButton
                    colorScheme='blue'
                    aria-label='Action'
                    onClick={() => handleClickEdit(content.id)}
                    icon={<MdOutlineModeEditOutline />}
                  />
                </Td>
              </Tr>
            ))
              :
              headers?.map((_, idx) => (
                <Tr key={idx}>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><SkeletonText /></Td>
                  <Td  ><Skeleton h='10' w='10' /></Td>
                </Tr>

              ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTable