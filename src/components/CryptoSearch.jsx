import React, { useState, useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchButton from './SearchButton';
import Trending from './Trending';
import SearchResults from './SearchResults';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Input,
    Flex,
    Spacer,
    Divider,
    HStack,
    CloseButton,
} from '@chakra-ui/react';

const CryptoSearch = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setLoading(true);
        setSearchQuery(e.target.value);
    };

    const resetSearchQuery = () => setSearchQuery('');

    const searchURL = `https://api.coingecko.com/api/v3/search?query=${searchQuery}`;

    const trendingUrl = 'https://api.coingecko.com/api/v3/search/trending';
    useEffect(() => {
        fetch(trendingUrl)
            .then((res) => res.json())
            .then((data) => setTrending(data.coins));
    }, []);

    //Search
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchQuery) {
                fetch(searchURL)
                    .then((res) => res.json())
                    .then((data) => setSearchResults(data))
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error));
            }
        }, 700);
        return () => clearTimeout(timeout);
    }, [searchQuery, searchURL]);

    return (
        <>
            <SearchButton onOpen={onOpen} />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onCloseComplete={resetSearchQuery}
                scrollBehavior="inside"
            >
                <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(5px)" />
                <ModalContent>
                    <ModalBody>
                        <Flex pt="5px">
                            <HStack spacing="16px">
                                <SearchIcon />
                                <Input
                                    placeholder="Search cryptocurrencies"
                                    value={searchQuery}
                                    onChange={handleChange}
                                    variant="unstyled"
                                />
                            </HStack>
                            <Spacer />

                            <CloseButton onClick={onClose} />
                        </Flex>

                        <div>
                            <Divider orientation="horizontal" my="10px" />

                            {searchQuery ? (
                                <SearchResults
                                    onClose={onClose}
                                    results={searchResults}
                                    loading={loading}
                                />
                            ) : (
                                <Trending
                                    onClose={onClose}
                                    trending={trending}
                                />
                            )}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CryptoSearch;
