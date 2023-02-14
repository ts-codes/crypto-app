import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </HashRouter>
);
