import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

const Footer = () => {
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
                Made by{' '}
                <Link href="https://github.com/ts-codes" isExternal>
                    Thomas Salmon
                </Link>
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
