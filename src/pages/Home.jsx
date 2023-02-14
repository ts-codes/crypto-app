import React, { useEffect, useState, useContext, useRef } from 'react';
import CryptoTable from '../components/CryptoTable';
import GlobalMarketStats from '../components/GlobalMarketStats';
import { Box, Text } from '@chakra-ui/react';
import Pagination from '../components/Pagination';
import { CryptoContext } from '../context/cryptoContext';

const Home = () => {
    const { selectedCurrency } = useContext(CryptoContext);
    const [cryptoTableData, setCryptoTableData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [tablePerPage, setTablePerPage] = useState(100);
    const [totalPages, setTotalPages] = useState(20);

    const cryptoTableDataUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=${tablePerPage}&page=${currentPage}&sparkline=true`;

    useEffect(() => {
        fetch(cryptoTableDataUrl)
            .then((res) => res.json())
            .then((data) => setCryptoTableData(data))
            .catch((err) => console.log(err));
    }, [cryptoTableDataUrl]);
    const scrollToRef = useRef();
    return (
        <Box
            display="flex"
            flexGrow="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingBlockEnd="120px"
        >
            <Text
                as="h1"
                fontSize="4xl"
                py="50px"
                textAlign={'center'}
                mx={'8px'}
                ref={scrollToRef}
            >
                Cryptocurrency Prices By Market Cap
            </Text>
            <GlobalMarketStats />
            <CryptoTable cryptos={cryptoTableData} />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                lastPage={totalPages}
                scrollToRef={scrollToRef}
            />
        </Box>
    );
};

export default Home;