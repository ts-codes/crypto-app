import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import theme from './theme';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import NotFound from './pages/NotFound';
import Watchlist from './pages/Watchlist';
import CryptoProvider from './context/cryptoContext';
import { Scrollbars } from 'rc-scrollbars';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <CryptoProvider>
                <Scrollbars autoHeight autoHeightMin={'100vh'}>
                    <Flex direction="column" minH="100vh">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/crypto" element={<CoinPage />}>
                                <Route
                                    path=":cryptoId"
                                    element={<CoinPage />}
                                />
                            </Route>
                        </Routes>
                        <Footer />
                    </Flex>
                </Scrollbars>
            </CryptoProvider>
        </ChakraProvider>
    );
}

export default App;
