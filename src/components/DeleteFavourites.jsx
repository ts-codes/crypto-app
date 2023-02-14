import React, { useContext } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { CryptoContext } from '../context/cryptoContext';

const DeleteFavourites = () => {
    const { favourites, deleteAllFavourites } = useContext(CryptoContext);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formatString = () =>
        favourites.length === 1 ? 'favourite' : 'favourites';

    return (
        <>
            <Button colorScheme="red" onClick={onOpen}>
                Clear All
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove All Favourites
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {`Are you sure you want to delete ${
                                favourites.length
                            } ${formatString()}?`}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    deleteAllFavourites();
                                    onClose();
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteFavourites;
