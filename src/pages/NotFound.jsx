import React from 'react';
import { Text, Box } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <Box bg="red.500" flexGrow="1" minH={'100vh'}>
            <Text fontSize="6xl" textAlign={'center'} mt={'40px'}>
                404 Page Not Found 😭
            </Text>
        </Box>
    );
};

export default NotFound;
