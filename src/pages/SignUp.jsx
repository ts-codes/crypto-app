import React from 'react';
import { Text, Box, useColorModeValue } from '@chakra-ui/react';

const SignUp = () => {
    const bgColor = useColorModeValue('blue.700', 'blue.800');
    return (
        <Box bg={bgColor} flexGrow="1" display={'flex'}>
            <Box mx={'auto'} mt={'32px'}>
                <Text fontSize="6xl">Coming soon...</Text>
            </Box>
        </Box>
    );
};

export default SignUp;
