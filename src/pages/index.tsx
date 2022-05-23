import { HStack, Stack, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { CardRecap } from '../components';
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import { MdHiking, MdAccessTime } from 'react-icons/md'

const dashboardRecap = [
  {
    icon: BsFillPersonLinesFill,
    title: 'Total User',
    value: 51,
    bgColor: 'cyan.400'
  },
  {
    icon: GiMoneyStack,
    title: 'Total Pendapatan',
    value: 'Rp.150000',
    bgColor: 'teal.300'
  },
  {
    icon: MdHiking,
    title: 'Peralatan Disewa',
    value: 5,
    bgColor: 'blue.300'
  },
  {
    icon: MdAccessTime,
    title: 'Menunggu Dikonfirmasi',
    value: 4,
    bgColor: 'orange.300'
  },
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Partner petualang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VStack alignItems='start' spacing='4' background='white' w='full' maxW='full' h='full' p='4'>
          <Text fontSize='xl' fontWeight='bold' >Dashboard</Text>
          <Stack justifyContent='space-between' alignItems='center' spacing={{ base: '5', md: '' }} direction={{ base: 'column', md: 'row' }} w='full' flexWrap='wrap'>
            {
              dashboardRecap.map(({ icon, title, value, bgColor }) => (
                <CardRecap key={title} title={title} icon={icon} value={value} bgColor={bgColor} />
              ))
            }
          </Stack>
        </VStack>
      </main>
    </>
  )
}

export default Home
