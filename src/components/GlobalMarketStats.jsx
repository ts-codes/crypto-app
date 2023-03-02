import React, { useContext, useState, useEffect } from 'react';
import { CryptoContext } from '../context/cryptoContext';
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
    const [globalStats, setGlobalStats] = useState([]);
    const statsUrl = 'https://api.coingecko.com/api/v3/global';
    const formatNumber = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: selectedCurrency.toUpperCase(),
        currencyDisplay: 'narrowSymbol',
        notation: 'compact',
        compactDisplay: 'short',
    });

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(statsUrl);
                if (!res.ok) {
                    throw new Error(
                        `Failed to fetch data. Status code: ${res.status}`
                    );
                }
                const data = await res.json();
                setGlobalStats(data.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [selectedCurrency]);

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
                    {isLoading ? (
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
                    {isLoading ? (
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
                    {isLoading ? (
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
