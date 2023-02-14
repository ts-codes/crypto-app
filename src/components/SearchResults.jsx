import React from 'react';
import {
    Center,
    Flex,
    Image,
    Spacer,
    Text,
    Stack,
    Spinner,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SearchResults = ({ onClose, results, loading }) => {
    return (
        <>
            <Text mb="12px">Search Results... </Text>

            {loading ? (
                <Flex justifyContent="center">
                    <Spinner mb="20px" />
                </Flex>
            ) : (
                <>
                    {!results.coins?.length && <Text>No results found</Text>}
                    {results.coins?.map((crypto) => (
                        <div key={crypto.id}>
                            <Flex py="1">
                                <Stack direction="row" spacing="16px" py={0.5}>
                                    <Image
                                        boxSize="20px"
                                        src={crypto.thumb}
                                        alt="Logo"
                                    />
                                    <Link
                                        to={`/crypto/${crypto.id}`}
                                        onClick={onClose}
                                    >
                                        <Text>
                                            {crypto.name}{' '}
                                            {crypto.symbol.toUpperCase()}{' '}
                                        </Text>
                                    </Link>
                                </Stack>
                                <Spacer />
                                <Center>
                                    {crypto.market_cap_rank > 0 ? (
                                        <Text fontSize="11px" color="gray.400">
                                            #{crypto.market_cap_rank}
                                        </Text>
                                    ) : null}
                                </Center>
                            </Flex>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default SearchResults;
