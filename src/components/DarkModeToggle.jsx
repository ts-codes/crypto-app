import React from 'react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Center, useColorMode, useColorModeValue } from '@chakra-ui/react';

const DarkModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const hoverColor = useColorModeValue(
        'rgba(255, 255, 255, 0.64)',
        'rgba(255, 255, 255, 0.08)'
    );
    return (
        <Center
            _hover={{ background: hoverColor, cursor: 'pointer' }}
            borderRadius="md"
            w="40px"
            h="40px"
            onClick={toggleColorMode}
        >
            <>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</>
        </Center>
    );
};

export default DarkModeToggle;
