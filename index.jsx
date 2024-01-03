import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';
import GlobalStyle from './anime/Gloabalstyle';
import { GlobalContextProvider } from './anime/context/global';
import './styles.less';
// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
    render(
        <React.StrictMode>
            <GlobalStyle />
            <GlobalContextProvider>
                <Router history={history}>
                    <App />
                </Router>
            </GlobalContextProvider>
        </React.StrictMode>,
        document.getElementById('app')
    );
}
