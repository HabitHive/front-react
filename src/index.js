import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store/configStore';
import GlobalStyle from "./components/common/GlobalStyle";
import MobileLayout from "./components/common/MobileLayout"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Provider store={store}>
        <GlobalStyle/>
        <MobileLayout>
            <App/>
        </MobileLayout>  
    </Provider>

);

