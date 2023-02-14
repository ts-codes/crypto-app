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

    useEffect(() => {
        fetch(statsUrl)
            .then((res) => res.json())
            .then((data) => setGlobalStats(data.data))
            .catch((err) => console.log(err));
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
                    <StatNumber>
                        {formatNumber.format(
                            globalStats.total_market_cap?.[selectedCurrency]
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
                </Stat>

                <Stat maxW="max-content" p="16px" pb="0px">
                    <StatLabel>Bitcoin Market Cap Dominance</StatLabel>
                    <StatNumber>
                        {globalStats.market_cap_percentage?.btc.toFixed(2)}%
                    </StatNumber>
                </Stat>

                <Stat maxW="max-content" p="16px" pb="0px">
                    <StatLabel>Active Cryptocurrencies</StatLabel>
                    <StatNumber>
                        {globalStats.active_cryptocurrencies}
                    </StatNumber>
                </Stat>
            </StatGroup>
        </Box>
    );
};

export default GlobalMarketStats;
