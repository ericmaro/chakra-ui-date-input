import * as React from 'react'
import { DatePicker } from 'chakra-ui-date-input'
import { Box, Center, VStack, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function SimpleComponent() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const bg = useColorModeValue("gray", "white");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <Center h='100vh' color='white'>
      <Box w='420px' h='100px'>
        <VStack align='center' alignContent='center' gap={8} direction='column'>
          <DatePicker
          colorScheme='blue'
            placeholder='Date picker placeholder'
            name='date'
            onChange={(date: any) => console.log(date)}
          />
              <IconButton
            size="md"
            fontSize="md"
            borderRadius="full"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            colorScheme={bg}
            ml={{ base: "0", md: "3" }}
            onClick={toggleMode}
            icon={<SwitchIcon color={bg} />}
          />
        </VStack>

      </Box>
    </Center>
  )
}
