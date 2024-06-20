import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import './index.css';
import { RecoilRoot } from 'recoil';

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props), 
      bg: mode('gray.50', '#1a202c')(props), 
    }
  })
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false, // Changed to false to not use system color mode
};

const colors = {
  gray: {
    light: "#f2f2f2", 
    dark: "#2d3748", 
  },
  text: {
    light: "#333",
    dark: "#ddd", 
  }
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);
