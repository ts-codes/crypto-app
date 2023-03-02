import React from 'react';
import CryptoTableItem from './CryptoTableItem';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    useColorModeValue,
    Box,
    Spinner,
} from '@chakra-ui/react';

const CryptoTable = ({ cryptos, isLoading }) => {
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    return (
        <>
            {isLoading ? (
                <Box maxW={'1050px'} h={'800px'} mx={'32px'} pt={'32px'}>
                    <Spinner size="xl" />
                </Box>
            ) : (
                <>
                    <TableContainer
                        overflowY="auto"
                        position={'relative'}
                        h={'800px'}
                    >
                        <Table variant="simple" overflow={'auto'}>
                            <Thead
                                position={'sticky'}
                                top={0}
                                zIndex={3}
                                bg={bgColor}
                                shadow={'lg'}
                            >
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Name</Th>
                                    <Th>Price</Th>
                                    <Th>24h %</Th>
                                    <Th>Market cap</Th>
                                    <Th>Volume (24h)</Th>
                                    <Th>Last 7 days</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <CryptoTableItem cryptos={cryptos} />
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
};

export default CryptoTable;
