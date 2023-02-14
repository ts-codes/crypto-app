import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Tr, Td, Text, Box, Image } from '@chakra-ui/react';
import FavouriteToggle from './FavouriteToggle';
import { CryptoContext } from '../context/cryptoContext';

const CryptoTableItem = ({ cryptos }) => {
    const { selectedCurrency } = useContext(CryptoContext);
    const sparklineColor = (arr) => {
        const result = arr[0] - arr[arr.length - 1];
        return result <= 0 ? 'green' : 'red';
    };
    const percentageColor = (value) => (value >= 0 ? 'green.500' : 'red.500');

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

    const formatLargeCurrency = (number) => {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: selectedCurrency.toUpperCase(),
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 0,
        }).format(number);
    };
    const { tableTopRef } = useContext(CryptoContext);

    return (
        <>
            {cryptos.map((crypto, index) => (
                <Tr key={crypto.id} ref={index === 0 ? tableTopRef : null}>
                    <Td>
                        <Box display="flex">
                            <FavouriteToggle
                                favouriteObject={{
                                    id: crypto.id,
                                }}
                            />
                            <Text>{crypto?.market_cap_rank}</Text>
                        </Box>
                    </Td>

                    <Td>
                        <Link
                            to={`/crypto/${crypto?.id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                boxSize="22px"
                                src={crypto?.image}
                                alt="Logo"
                                me="10px"
                            />
                            <Box display={'flex'}>
                                <Text>{crypto?.name}</Text>

                                <Text
                                    fontSize={'12px'}
                                    color="gray.400"
                                    ms={'5px'}
                                >
                                    {crypto?.symbol.toUpperCase()}
                                </Text>
                            </Box>
                        </Link>
                    </Td>
                    <Td>{formatPrice(crypto?.current_price)}</Td>

                    <Td
                        color={percentageColor(
                            crypto?.price_change_percentage_24h
                        )}
                    >
                        {crypto?.price_change_percentage_24h?.toFixed(2)}
                    </Td>

                    <Td>{formatLargeCurrency(crypto?.market_cap)}</Td>
                    <Td>{formatLargeCurrency(crypto?.total_volume)}</Td>

                    <Td>
                        <Sparklines data={crypto?.sparkline_in_7d.price}>
                            <SparklinesLine
                                color={sparklineColor(
                                    crypto?.sparkline_in_7d.price
                                )}
                                style={{ fill: 'none' }}
                            />
                        </Sparklines>
                    </Td>
                </Tr>
            ))}
        </>
    );
};

export default CryptoTableItem;
