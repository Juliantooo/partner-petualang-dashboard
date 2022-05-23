import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { ICardRecapProps } from '../libs/utils/interfaces'

const CardRecap: React.FC<ICardRecapProps> = ({ icon, title, value, bgColor }) => {
    return (
        <Box h='32' p='3' w='80' >
            <HStack borderRadius='lg' p='3' spacing='5' h='full' boxShadow='md'>
                <Box backgroundColor={bgColor} color='white' borderRadius='md' h='full' w='30%' display='flex' justifyContent='center' alignItems='center'>
                    <Icon as={icon} fontSize='25' />
                </Box>
                <VStack spacing='1' alignItems='start'>
                    <Text textColor='gray.500' fontWeight='bold'>{title}</Text>
                    <Text fontSize='xl' textColor='gray.800' fontWeight='bold'>{value}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

export default CardRecap