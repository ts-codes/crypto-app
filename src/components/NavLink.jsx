import { useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ children, to, handleLinkClick }) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const hoverColor = useColorModeValue(
        'rgba(255, 255, 255, 0.64)',
        'rgba(255, 255, 255, 0.08)'
    );

    const styles = {
        display: 'flex',
        marginInline: '8px',
        padding: '8px',
        paddingInline: '12px',
        borderRadius: '5px',
        backgroundColor: isHover ? hoverColor : '',
    };

    return (
        <Link
            style={styles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to={to}
            onClick={handleLinkClick}
        >
            {children}
        </Link>
    );
};

export default NavLink;
