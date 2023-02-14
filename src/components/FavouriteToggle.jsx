import React, { useState, useContext, useEffect } from 'react';
import { Icon, Box } from '@chakra-ui/react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import { CryptoContext } from '../context/cryptoContext';

const FavouriteToggle = ({ favouriteObject }) => {
    const toggleStar = () => {
        favourites.some((favourite) => favourite.id === favouriteObject.id)
            ? setIsFavourite(true)
            : setIsFavourite(false);
    };
    const [isFavourite, setIsFavourite] = useState(false);
    const { favourites, addFavourite, removeFavourite } =
        useContext(CryptoContext);

    useEffect(() => {
        toggleStar();
    });

    const handleClick = () => {
        if (
            favourites.some((favourite) => favourite.id === favouriteObject.id)
        ) {
            removeFavourite(favouriteObject);
        } else {
            addFavourite(favouriteObject);
        }
    };
    return (
        <Box mr="8px">
            {isFavourite ? (
                <Icon
                    color="yellow.500"
                    onClick={handleClick}
                    as={RiStarFill}
                    _hover={{
                        cursor: 'pointer',
                    }}
                    w={'20px'}
                    h={'20px'}
                />
            ) : (
                <Icon
                    onClick={handleClick}
                    _hover={{
                        cursor: 'pointer',
                        color: 'yellow.500',
                    }}
                    as={RiStarLine}
                    w={'20px'}
                    h={'20px'}
                />
            )}
        </Box>
    );
};

export default FavouriteToggle;
