import React from 'react';
import {
    Box,
    Icon,
    Show,
    Hide,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchButton = ({ onOpen }) => {
    const textColor = useColorModeValue('gray.800', 'gray.400');
    const bgColor = useColorModeValue('gray.200', 'gray.700');
    return (
        <>
            <Hide above="md">
                <IconButton
                    onClick={onOpen}
                    aria-label="search"
                    icon={<SearchIcon />}
                    variant="ghost"
                />
            </Hide>

            <Show above="md">
                <Box
                    as="button"
                    aria-label="search"
                    onClick={onOpen}
                    color={textColor}
                    bg={bgColor}
                    borderRadius={'md'}
                    py={'10px'}
                    px={'20px'}
                    width={'220px'}
                    display={'flex'}
                    justifyContent={'flex-start'}
                    m={'8px'}
                >
                    <Box>
                        <Icon as={SearchIcon} color={textColor} me={'12px'} />
                        Search
                    </Box>
                </Box>
            </Show>
        </>
    );
};

export default SearchButton;
