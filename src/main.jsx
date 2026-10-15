import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource-variable/dm-sans';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import App from './App';
import './styles/tokens.css';


import './styles/site.css';
import './styles/deep.css';
import './styles/blocks.css';
import './styles/photo.css';
import './styles/dai.css';
import './styles/motion.css';
import './styles/connect.css';
import './styles/heroes.css';
import './styles/solar.css';
import './styles/managed.css';
import './styles/refine.css';


document.documentElement.classList.add('js');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
