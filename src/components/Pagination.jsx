import { Button, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { CryptoContext } from '../context/cryptoContext';

const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {
    const { tableTopRef } = useContext(CryptoContext);
    const btnPlaceholder = (
        <Button
            colorScheme="blue"
            size={'sm'}
            variant="solid"
            as={'div'}
            sx={{ pointerEvents: 'none' }}
        >
            ...
        </Button>
    );
    const handleClick = (e) => {
        if (e.target.value === 'prev') {
            setCurrentPage((state) => state - 1);
        } else if (e.target.value === 'next') {
            setCurrentPage((state) => state + 1);
        } else if (currentPage != e.target.value) {
            setCurrentPage(parseInt(e.target.value));
        }
    };
    useEffect(() => {
        tableTopRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [currentPage]);
    return (
        <nav>
            <Stack direction="row" spacing={2} my={'16px'} align="center">
                <Button
                    colorScheme="blue"
                    size={'sm'}
                    variant="solid"
                    disabled={currentPage === 1}
                    value={'prev'}
                    onClick={(e) => {
                        handleClick(e);
                    }}
                >
                    {'< Prev'}
                </Button>
                <Button
                    colorScheme="blue"
                    size={'sm'}
                    variant="solid"
                    value={1}
                    onClick={(e) => {
                        handleClick(e);
                    }}
                    isActive={currentPage === 1}
                >
                    1
                </Button>

                {currentPage > 2 ? btnPlaceholder : null}

                {/* BUGFIX  */}
                {currentPage === 1 || currentPage === lastPage ? null : (
                    <Button
                        colorScheme="blue"
                        size={'sm'}
                        variant="solid"
                        isActive={true}
                    >
                        {currentPage}
                    </Button>
                )}

                {currentPage < lastPage ? btnPlaceholder : null}

                <Button
                    colorScheme="blue"
                    size={'sm'}
                    variant="solid"
                    value={lastPage}
                    onClick={(e) => {
                        handleClick(e);
                    }}
                    isActive={currentPage === lastPage}
                >
                    {lastPage}
                </Button>
                <Button
                    colorScheme="blue"
                    size={'sm'}
                    variant="solid"
                    disabled={currentPage === lastPage}
                    value={'next'}
                    onClick={(e) => {
                        handleClick(e);
                    }}
                >
                    {'Next >'}
                </Button>
            </Stack>
        </nav>
    );
};

export default Pagination;
