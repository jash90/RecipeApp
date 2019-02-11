import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Home, Recipe, Recipes } from './src/scenes';
import { MenuProvider } from 'react-native-popup-menu';
import store from './src/stores';
import { Provider } from 'mobx-react';
export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Provider {...store}>
          <Router>
            <Stack key="root">
              <Scene key="Home" component={Home} hideNavBar />
              <Scene key="Recipe" component={Recipe} hideNavBar />
              <Scene key="Recipes" component={Recipes} hideNavBar />
            </Stack>
          </Router>
        </Provider>
      </MenuProvider>
    );
  }
}
