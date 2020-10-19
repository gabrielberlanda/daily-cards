import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../store';
import App from './App';
import CardDashboard from './CardDashboard';
import { initializeIcons, Fabric, Customizations, Stack } from '@fluentui/react';
import { lightTheme, darkTheme } from '../theme/Theme';
import { FirebaseLayoutContextProvider } from '../context/FirebaseLayoutContext';

type Props = {
  store: Store;
  history: History;
};

//Initialize fluent icons
initializeIcons();

const Root = ({ store, history }: Props) => {
  
  Customizations.applySettings({
    theme: lightTheme
  });

  return (
    <Fabric applyThemeToBody>
      <Stack>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App>
              <FirebaseLayoutContextProvider>
                <CardDashboard />
              </FirebaseLayoutContextProvider>
            </App>
          </ConnectedRouter>
        </Provider>
      </Stack>
    </Fabric>
  );
}

export default hot(Root);
