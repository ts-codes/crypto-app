import React from 'react';
import { Link } from 'react-router-dom';
import { Center, Flex, Image, Spacer, Text, Stack } from '@chakra-ui/react';

const Trending = ({ onClose, trending }) => {
    return (
        <>
            <Text mb="12px">Trending 🔥 </Text>
            {trending.map((crypto) => (
                <div key={crypto.item.id}>
                    <Flex py="1">
                        <Stack direction="row" spacing="16px" py={0.5}>
                            <Image
                                boxSize="20px"
                                src={crypto.item.thumb}
                                alt="Logo"
                            />
                            <Link
                                to={`/crypto/${crypto.item.id}`}
                                onClick={onClose}
                            >
                                <Text>
                                    {crypto.item.name}{' '}
                                    {crypto.item.symbol.toUpperCase()}{' '}
                                </Text>
                            </Link>
                        </Stack>
                        <Spacer />
                        <Center>
                            {crypto.item.market_cap_rank ? (
                                <Text fontSize="11px" color="gray.400">
                                    #{crypto.item.market_cap_rank}
                                </Text>
                            ) : null}
                        </Center>
                    </Flex>
                </div>
            ))}
        </>
    );
};

export default Trending;
