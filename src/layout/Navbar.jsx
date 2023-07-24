import React, { useRef } from 'react';
import CryptoSearch from '../components/CryptoSearch';
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    HStack,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import NavLink from '../components/NavLink';
import CurrencySelect from '../components/CurrencySelect';
import DarkModeToggle from '../components/DarkModeToggle';

const Navbar = () => {
    const bg = useColorModeValue('gray.50', 'gray.800');
    const mobileNav = useDisclosure();
    const overlayRef = useRef();
    const handleLinkClick = () => {
        mobileNav.onClose();
    };

    return (
        <>
            <chakra.header
                bg={{ base: bg }}
                w="full"
                px={{ base: 2, sm: 4, lg: 50 }}
                py={4}
                shadow="lg"
            >
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Flex>

                    <HStack display="flex" alignItems="center" spacing={1}>
                        <HStack
                            spacing={1}
                            mr={1}
                            color="brand.500"
                            display={{ base: 'none', md: 'inline-flex' }}
                        >
                            <NavLink to={'/watchlist'}>Watchlist</NavLink>
                            {/* <NavLink to={'/login'}>Login</NavLink> */}
                            {/* <NavLink to={'/sign-up'}>Sign-up</NavLink> */}
                        </HStack>{' '}
                        <Box display={{ base: 'none', md: 'block' }}>
                            <CurrencySelect mobileNav={mobileNav} />
                        </Box>
                        <DarkModeToggle />
                        <CryptoSearch />
                        <Box display={{ base: 'inline-flex', md: 'none' }}>
                            <IconButton
                                aria-label="Open menu"
                                icon={<AiOutlineMenu />}
                                display={{ base: 'flex', md: 'none' }}
                                fontSize="20px"
                                color="gray.800"
                                _dark={{ color: 'inherit' }}
                                variant="ghost"
                                onClick={mobileNav.onOpen}
                            />

                            <Box
                                display={mobileNav.isOpen ? 'flex' : 'none'}
                                ref={overlayRef}
                                onClick={(e) => {
                                    if (e.target === overlayRef.current) {
                                        mobileNav.onClose();
                                    }
                                }}
                                background="blackAlpha.600"
                                pos="absolute"
                                zIndex={4}
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                            >
                                <VStack
                                    display={mobileNav.isOpen ? 'flex' : 'none'}
                                    pos="absolute"
                                    zIndex={5}
                                    top={0}
                                    left={0}
                                    right={0}
                                    flexDirection="column"
                                    p={2}
                                    pb={'40px'}
                                    bg={bg}
                                    spacing={3}
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        w="100%"
                                        h="60px"
                                        pt="12px"
                                        pr="10px"
                                    >
                                        <CloseButton
                                            fontSize="20px"
                                            aria-label="Close menu"
                                            onClick={mobileNav.onClose}
                                        />
                                    </Box>
                                    {/* === MOBILE LINKS === */}
                                    <NavLink
                                        to={'/watchlist'}
                                        handleLinkClick={handleLinkClick}
                                    >
                                        Watchlist
                                    </NavLink>
                                    {/* <NavLink
                                        to={'/login'}
                                        handleLinkClick={handleLinkClick}
                                    >
                                        Login
                                    </NavLink> */}
                                    {/* <NavLink
                                        to={'/sign-up'}
                                        handleLinkClick={handleLinkClick}
                                    >
                                        Sign-up
                                    </NavLink> */}
                                    <CurrencySelect mobileNav={mobileNav} />
                                </VStack>
                            </Box>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
};

export default Navbar;
