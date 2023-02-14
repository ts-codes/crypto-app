import React, { useRef, useContext } from 'react';
import { Box, Select } from '@chakra-ui/react';
import { CryptoContext } from '../context/cryptoContext';

const CurrencySelect = ({ mobileNav }) => {
    const selectRef = useRef();

    const { selectedCurrency, setSelectedCurrency } = useContext(CryptoContext);

    const handleChange = (e) => {
        setSelectedCurrency(e.target.value);
        mobileNav.onClose();
    };

    return (
        <Box>
            <Select
                ref={selectRef}
                variant="flushed"
                w="75px"
                size="sm"
                value={selectedCurrency}
                onChange={handleChange}
            >
                <option value="usd">$USD</option>
                <option value="gbp">£GBP</option>
                <option value="eur">€EUR</option>
            </Select>
        </Box>
    );
};

export default CurrencySelect;
