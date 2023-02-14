import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const CoinPageStat = ({ label, data }) => {
    return (
        <>
            <Flex
                justifyContent={'space-between'}
                p={{ base: '2px', md: '6px' }}
                minW={'150px'}
                sx={{ borderBottom: '1px solid #718096' }}
            >
                <Text textAlign={'left'}>{label}</Text>
                <Text textAlign={'right'}>{!data ? '-' : data}</Text>
            </Flex>
        </>
    );
};

export default CoinPageStat;
