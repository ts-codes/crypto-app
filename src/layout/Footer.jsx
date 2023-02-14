import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <Box
            minH="100px"
            bg="gray.700"
            display="flex"
            flexDirection="column"
            alignItems="center"
            py="30px"
        >
            <Text fontSize="xs" color="white">
                © {year} Thomas. All rights reserved{' '}
            </Text>
            <Text fontSize="xs" color="white">
                Powered by{' '}
                <Link href="https://www.coingecko.com/en/api" isExternal>
                    CoinGecko API
                </Link>
            </Text>
            <Text fontSize="xs" color="white">
                This website does not provide financial advice
            </Text>
        </Box>
    );
};

export default Footer;
