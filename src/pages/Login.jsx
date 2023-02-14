import React from 'react';
import { Text, Box, useColorModeValue } from '@chakra-ui/react';

const Login = () => {
    const bgColor = useColorModeValue('blue.700', 'blue.800');
    return (
        <Box bg={bgColor} flexGrow="1" display={'flex'}>
            <Box mx={{ base: 'auto', sm: 'auto' }} mt={'32px'}>
                <Text fontSize="6xl" textAlign={'center'}>
                    Coming soon...
                </Text>
            </Box>
        </Box>
    );
};

export default Login;
