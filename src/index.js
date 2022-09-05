import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store/configStore';
import GlobalStyle from "./components/common/GlobalStyle";
import Layout from "./components/common/Layout"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Provider store={store}>
        <GlobalStyle/>
        <Layout>
            <App/>
        </Layout>  
    </Provider>

);

