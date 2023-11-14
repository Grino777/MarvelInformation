import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import MarvelService from './services/MarvelService';

import './style/style.scss';

const marvelService = new MarvelService();

marvelService.getAllCharacters().then((res) => {
    res.data.results.forEach((item) => console.log(item.name));
});

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
