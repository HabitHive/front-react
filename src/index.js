import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import GlobalStyle from "./components/common/GlobalStyle";
import Layout from "./components/common/Layout"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <>
    <GlobalStyle/>
        <Layout>
            <App/>
        </Layout>  
    </>

);

