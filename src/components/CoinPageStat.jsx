import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CoinPageStat = ({ label, data }) => {
    return (
        <>
            <Flex
                justifyContent={'space-between'}
                p={{ base: '2px', md: '6px' }}
                minW={'150px'}
                sx={{ borderBottom: '1px solid #718096' }}
            >
                <Box>{label}</Box>
                <Box>{!data ? '-' : data}</Box>
            </Flex>
        </>
    );
};

export default CoinPageStat;
