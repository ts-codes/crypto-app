import React, { useContext, useState, useEffect } from 'react';
import { CryptoContext } from '../context/cryptoContext';
import useFetch from '../hooks/useFetch';
import {
    Box,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Spinner,
} from '@chakra-ui/react';

const GlobalMarketStats = () => {
    const { selectedCurrency } = useContext(CryptoContext);
    const statsUrl = 'https://api.coingecko.com/api/v3/global';
    const formatNumber = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: selectedCurrency.toUpperCase(),
        currencyDisplay: 'narrowSymbol',
        notation: 'compact',
        compactDisplay: 'short',
    });

    const [globalStats, setGlobalStats] = useState([]);
    const { data, isLoading } = useFetch(statsUrl);

    useEffect(() => {}, [selectedCurrency]);

    useEffect(() => {
        if (data) {
            setGlobalStats(data.data);
        }
    }, [data]);

    return (
        <Box w="full" maxW={'1100px'} minH="60px" marginBlockEnd="40px">
            <StatGroup
                display="flex"
                justifyContent="space-around"
                alignItems="flex-start"
                flexWrap="wrap"
            >
                <Stat maxW="max-content" p="16px" pb="0px">
                    <StatLabel>Total Market Cap</StatLabel>
                    {isLoading || globalStats.length === 0 ? (
                        <Spinner size="lg" />
                    ) : (
                        <>
                            <StatNumber>
                                {formatNumber.format(
                                    globalStats.total_market_cap?.[
                                        selectedCurrency
                                    ]
                                )}
                            </StatNumber>
                            <StatHelpText>
                                <StatArrow
                                    type={
                                        globalStats.market_cap_change_percentage_24h_usd >=
                                        0
                                            ? 'increase'
                                            : 'decrease'
                                    }
                                />
                                {globalStats.market_cap_change_percentage_24h_usd?.toFixed(
                                    2
                                )}
                                %
                            </StatHelpText>
                        </>
                    )}
                </Stat>

                <Stat maxW="max-content" p="16px" pb="0px">
                    <StatLabel>Bitcoin Market Cap Dominance</StatLabel>
                    {isLoading || globalStats.length === 0 ? (
                        <Spinner size="lg" />
                    ) : (
                        <>
                            <StatNumber>
                                {globalStats.market_cap_percentage?.btc.toFixed(
                                    2
                                )}
                                %
                            </StatNumber>
                        </>
                    )}
                </Stat>

                <Stat maxW="max-content" p="16px" pb="0px">
                    <StatLabel>Active Cryptocurrencies</StatLabel>
                    {isLoading || globalStats.length === 0 ? (
                        <Spinner size="lg" />
                    ) : (
                        <>
                            <StatNumber>
                                {globalStats.active_cryptocurrencies}
                            </StatNumber>
                        </>
                    )}
                </Stat>
            </StatGroup>
        </Box>
    );
};

export default GlobalMarketStats;
