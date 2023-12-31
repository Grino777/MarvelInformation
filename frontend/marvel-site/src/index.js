import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';

import './style/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
