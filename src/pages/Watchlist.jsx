import React, { useContext, useEffect, useState } from 'react';
import { Text, Box, Icon, Image } from '@chakra-ui/react';
import { CryptoContext } from '../context/cryptoContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteFavourites from '../components/DeleteFavourites';

const Watchlist = () => {
    const { favourites, removeFavourite, selectedCurrency } =
        useContext(CryptoContext);
    const [favouriteIds, setFavouriteIds] = useState('');
    const [coinData, setCoinData] = useState('');
    const handleDelete = (object) => {
        removeFavourite(object);
    };
    function fetchSetCoinData() {
        (async function () {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${favouriteIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );
            const data = await res.json();
            setCoinData(data);
        })();
    }

    useEffect(() => {
        if (favourites.length === 0) {
            setFavouriteIds('');
            setCoinData('');
        } else {
            setFavouriteIds(
                favourites.map((favourite) => favourite.id).join('%2C')
            );
        }
    }, [favourites]);

    useEffect(() => {
        if (favouriteIds) {
            fetchSetCoinData();
        }
    }, [favouriteIds, selectedCurrency]);

    const formatPrice = (price) => {
        const formatCurrency = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: selectedCurrency.toUpperCase(),
            currencyDisplay: 'narrowSymbol',
        });
        const formatCurrencySmall = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: selectedCurrency.toUpperCase(),
            currencyDisplay: 'narrowSymbol',
            minimumSignificantDigits: 4,
            maximumSignificantDigits: 4,
        });

        if (price < 1) {
            return formatCurrencySmall.format(price);
        } else return formatCurrency.format(price);
    };

    return (
        <Box minH={'100vh'}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                paddingBlockStart={'40px'}
            >
                <Text fontSize="6xl">Watchlist</Text>
            </Box>
            <Box
                display={'flex'}
                maxW="720px"
                marginInline="auto"
                flexDirection="column"
                px="16px"
                py="48px"
            >
                {coinData.length ? (
                    <>
                        <Box display="flex" justifyContent="flex-end" mb="24px">
                            <DeleteFavourites />
                        </Box>

                        {coinData?.map((object) => (
                            <Box
                                display="flex"
                                mb="8px"
                                key={object.id}
                                paddingY="4px"
                                paddingX="20px"
                                borderRadius="5px"
                            >
                                <Box
                                    as={Link}
                                    to={`/crypto/${object.id}`}
                                    display="flex"
                                    flexGrow="1"
                                >
                                    <Box display="flex">
                                        <Image
                                            boxSize="22px"
                                            src={object.image}
                                            alt="Logo"
                                            me="10px"
                                            display={'inline-block'}
                                        />
                                        <Box>{object.name}</Box>
                                    </Box>
                                    <Box
                                        marginLeft={'auto'}
                                        marginRight={'30px'}
                                    >
                                        {formatPrice(object.current_price)}
                                    </Box>
                                </Box>
                                <Box>
                                    <Icon
                                        _hover={{
                                            cursor: 'pointer',
                                            color: 'red.500',
                                        }}
                                        as={FaTrash}
                                        onClick={() => {
                                            handleDelete(object);
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </>
                ) : (
                    <Text fontSize="2xl">No favourites to display...</Text>
                )}
            </Box>
        </Box>
    );
};

export default Watchlist;
