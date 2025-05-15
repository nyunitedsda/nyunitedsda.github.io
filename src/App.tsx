import { Grid, Stack } from '@mui/material'
import { type FC, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const HEADER_SIZE = 68.5
const FOOTER_SIZE = 250
const App: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <Grid container sx={{width: '100%', height: '100%',  overflowX: 'hidden', overflowY: 'auto'}}>
      <Header />
      <Stack sx={{ flexGrow: 1, minHeight: `calc(100vh - 30px - ${HEADER_SIZE + FOOTER_SIZE}px)`, width: '100%' }}>
        life
      </Stack>

      <Footer/>
    </Grid >
  )
}

export default App
