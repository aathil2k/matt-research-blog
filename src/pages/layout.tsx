import Navbar from '../components/Navbar'
import Footereds from '../components/Servicefooter'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppBarPropsColorOverrides } from '@mui/material'

export default function commonLayout({children}: {children: React.ReactNode}) {
    return(
        <div>
            <Navbar/>
            <main>
                   {children}
            </main>
            <Footereds/>
        </div>
    )
}