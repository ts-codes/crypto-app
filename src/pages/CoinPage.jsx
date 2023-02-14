import React, { useContext, useState, useEffect } from 'react';
import { CryptoContext } from '../context/cryptoContext';
import { useParams } from 'react-router-dom';
import {
    Text,
    Box,
    Container,
    Flex,
    Image,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import FavouriteToggle from '../components/FavouriteToggle';
import CoinPageStat from '../components/CoinPageStat';
import Chart from '../components/Chart';
import DOMPurify from 'dompurify';

const CoinPage = () => {
    const rankBgColor = useColorModeValue('gray.300', 'gray.700');
    const { selectedCurrency } = useContext(CryptoContext);
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
        } else if (isNaN(price) || price === 0) {
            return '';
        } else return formatCurrency.format(price);
    };

    const formatCoinSupply = (number) => {
        if (isNaN(number) || !number) {
            return 0;
        }
        return new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 0,
        }).format(number);
    };

    const [coinData, setCoinData] = useState();
    const [chartData, setChartData] = useState();
    const [numDays, setNumDays] = useState('7');
    const handleBtnClick = (num) => {
        setNumDays(num);
    };
    const params = useParams();
    const coinUrl = `https://api.coingecko.com/api/v3/coins/${params.cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const chartUrl = `https://api.coingecko.com/api/v3/coins/${params.cryptoId}/market_chart?vs_currency=${selectedCurrency}&days=${numDays}`;
    const sanitisedData = () => ({
        __html: DOMPurify.sanitize(coinData?.description.en, {
            FORBID_TAGS: ['a'],
        }),
    });

    async function fetchCoinMarketData() {
        const res = await fetch(coinUrl);
        const data = await res.json();
        setCoinData(data);
    }
    async function fetchChartData() {
        const res = await fetch(chartUrl);
        const data = await res.json();
        setChartData(data);
    }

    useEffect(() => {
        fetchCoinMarketData();
        fetchChartData();
    }, [coinUrl, chartUrl, numDays]);

    return (
        <Box
            minH={'100vh'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingBlockEnd="120px"
        >
            <Container maxW="6xl" py={'40px'}>
                <HStack alignItems={'center'} spacing={'10px'}>
                    <Image
                        boxSize={'35px'}
                        src={coinData?.image.small}
                        alt={'logo'}
                    />
                    <Text fontSize={{ base: '22px', sm: '3xl', md: '4xl' }}>
                        {coinData?.name}
                    </Text>

                    <Text fontSize={{ base: '12px', sm: '16px' }}>
                        {coinData?.symbol.toUpperCase()}
                    </Text>

                    <FavouriteToggle
                        favouriteObject={{
                            id: coinData?.id,
                        }}
                    />
                </HStack>
                <Box>
                    <Text fontSize={{ base: '22px', sm: '3xl', md: '4xl' }}>
                        {formatPrice(
                            coinData?.market_data.current_price[
                                selectedCurrency
                            ]
                        )}
                    </Text>
                </Box>
                <Box
                    borderRadius={'8px'}
                    bg={rankBgColor}
                    py={'7px'}
                    px={'7px'}
                    my={'8px'}
                    width={'max-content'}
                >
                    <Text fontSize={'xs'}>
                        Rank #{coinData?.market_cap_rank}
                    </Text>
                </Box>
                {/* ------------------------------------------------ */}

                <Box
                    maxW={'720px'}
                    w={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    my={'16px'}
                    p={'8px'}
                >
                    <Flex flexDirection={'column'}>
                        <CoinPageStat
                            label={'Marketcap'}
                            data={formatPrice(
                                coinData?.market_data.market_cap[
                                    selectedCurrency
                                ]
                            )}
                        />

                        <CoinPageStat
                            label={'Fully Diluted Marketcap'}
                            data={formatPrice(
                                coinData?.market_data.fully_diluted_valuation[
                                    selectedCurrency
                                ]
                            )}
                        />
                        <CoinPageStat
                            label={'Volume 24h'}
                            data={formatPrice(
                                coinData?.market_data.total_volume[
                                    selectedCurrency
                                ]
                            )}
                        />
                        <CoinPageStat
                            label={'Circulating Supply'}
                            data={`${formatCoinSupply(
                                coinData?.market_data.circulating_supply
                            )} ${coinData?.symbol.toUpperCase()}`}
                        />
                        <CoinPageStat
                            label={'Total Supply'}
                            data={`${formatCoinSupply(
                                coinData?.market_data.total_supply
                            )} ${coinData?.symbol.toUpperCase()}`}
                        />
                        <CoinPageStat
                            label={'Max Supply'}
                            data={
                                !formatCoinSupply(
                                    coinData?.market_data.max_supply
                                )
                                    ? 0
                                    : `${formatCoinSupply(
                                          coinData?.market_data.max_supply
                                      )} ${coinData?.symbol.toUpperCase()}`
                            }
                        />
                    </Flex>
                </Box>

                {/* ----------------------------------------------------- */}
                <Box minW={'300px'} maxW={'820px'}>
                    <Text
                        my={{ base: '8px', sm: '16px', md: '32px' }}
                        fontSize={{ base: '22px', sm: '3xl' }}
                    >
                        {`${
                            coinData?.name
                        } ${selectedCurrency.toUpperCase()} Price Chart
                        ${numDays === 'max' ? '(All)' : `(${numDays} day)`}`}
                    </Text>
                    {chartData ? (
                        <Chart
                            chartData={chartData?.prices}
                            numDays={numDays}
                        />
                    ) : null}
                    <HStack spacing={'16px'} my={'20px'} w={'100%'}>
                        <Button
                            colorScheme="blue"
                            onClick={(e) => handleBtnClick(e.target.value)}
                            size={{ base: 'sm', sm: 'md' }}
                            value={'1'}
                            isActive={numDays === '1'}
                        >
                            1D
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={(e) => handleBtnClick(e.target.value)}
                            size={{ base: 'sm', sm: 'md' }}
                            value={'7'}
                            isActive={numDays === '7'}
                        >
                            7D
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={(e) => handleBtnClick(e.target.value)}
                            size={{ base: 'sm', sm: 'md' }}
                            value={'30'}
                            isActive={numDays === '30'}
                        >
                            30D
                        </Button>

                        <Button
                            colorScheme="blue"
                            onClick={(e) => handleBtnClick(e.target.value)}
                            size={{ base: 'sm', sm: 'md' }}
                            value={'90'}
                            isActive={numDays === '90'}
                        >
                            90D
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={(e) => handleBtnClick(e.target.value)}
                            size={{ base: 'sm', sm: 'md' }}
                            value={'max'}
                            isActive={numDays === 'max'}
                        >
                            Max
                        </Button>
                    </HStack>
                    <Box my={'26px'} p={{ base: '0', sm: '16px' }}>
                        <Text dangerouslySetInnerHTML={sanitisedData()} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CoinPage;
