import * as React from 'react'
import { DatePicker } from 'chakra-ui-date-input'
import {
  Box,
  Center,
  VStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { CodeBlock, dracula, purebasic } from 'react-code-blocks'

const code = ` <DatePicker
  placeholder='Date picker placeholder'
  name='date'
  onChange={(date: string) => console.log(date)}
/>`

export default function SimpleComponent() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const bg = useColorModeValue('gray', 'white')
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <Center h='100vh' color='white'>
      <Box w='420px' h='100px'>
        <VStack align='center' alignContent='center' gap={8} direction='column'>
          <DatePicker
            placeholder='Date picker placeholder'
            dateFormat='dd/MM/yyyy'
            name='date'
            onChange={(date: string) => console.log(date)}
          />
          <IconButton
            size='md'
            fontSize='md'
            borderRadius='full'
            aria-label={`Switch to ${text} mode`}
            variant='ghost'
            colorScheme={bg}
            ml={{ base: '0', md: '3' }}
            onClick={toggleMode}
            icon={<SwitchIcon color={bg} />}
          />
          <Text>How to use it </Text>
          <Box>
            <CodeBlock
              text={code}
              language='jsx'
              showLineNumbers
              wrapLines
              theme={text === 'dark' ? purebasic : dracula}
            />
          </Box>
          <Box>
            <a
              className='github-button'
              href='https://github.com/ericmaro/chakra-ui-date-input'
              data-icon='octicon-star'
              data-size='large'
              aria-label='Star ericmaro/chakra-ui-date-input on GitHub'
            >
              Star
            </a>
          </Box>
        </VStack>
      </Box>
    </Center>
  )
}
