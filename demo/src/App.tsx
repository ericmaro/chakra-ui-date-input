import React from 'react'

import 'chakra-ui-date-input/dist/index.css'
import { ChakraProvider, theme } from '@chakra-ui/react'
import SimpleComponent from './components/SimpleComponent'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SimpleComponent />
    </ChakraProvider>
  )
}

export default App
