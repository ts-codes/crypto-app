import { Button, Stack } from '@chakra-ui/react';
import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, lastPage, scrollToRef }) => {
    const nextBtn = (
        <Button
            colorScheme="blue"
            size={'sm'}
            variant="solid"
            disabled={currentPage === lastPage}
            onClick={() => {
                setCurrentPage((state) => state + 1);
                scrollToRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }}
        >
            {'Next >'}
        </Button>
    );
    const prevBtn = (
        <Button
            colorScheme="blue"
            size={'sm'}
            variant="solid"
            disabled={currentPage === 1}
            onClick={() => {
                setCurrentPage((state) => state - 1);
                scrollToRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }}
        >
            {'< Prev'}
        </Button>
    );
    return (
        <nav>
            <Stack direction="row" spacing={2} my={'16px'} align="center">
                {prevBtn}

                <Button
                    colorScheme="blue"
                    size={'sm'}
                    variant="solid"
                    onClick={() => {
                        setCurrentPage(1);
                        scrollToRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }}
                    isActive={currentPage === 1}
                >
                    1
                </Button>

                {currentPage > 2 ? (
                    <Button colorScheme="blue" size={'sm'} variant="solid">
                        ...
                    </Button>
                ) : null}

                {currentPage !== 1 && currentPage !== lastPage ? (
                    <Button
                        colorScheme="blue"
                        size={'sm'}
                        variant="solid"
                        isActive={true}
                    >
                        {currentPage}
                    </Button>
                ) : null}

                {currentPage < lastPage ? (
                    <Button colorScheme="blue" size={'sm'} variant="solid">
                        ...
                    </Button>
                ) : null}

                <Button
                    colorScheme="blue"
                    size={'sm'}
                    variant="solid"
                    onClick={() => {
                        setCurrentPage(lastPage);
                        scrollToRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }}
                    isActive={currentPage === lastPage}
                >
                    {lastPage}
                </Button>
                {nextBtn}
            </Stack>
        </nav>
    );
};

export default Pagination;
