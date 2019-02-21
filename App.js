import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Home, Recipe, Recipes } from './src/scenes';
import { MenuProvider } from 'react-native-popup-menu';
import store from './src/stores';
import { Provider } from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Provider {...store}>
          <Router>
            <Stack key="root">
              <Scene key="Home" component={Home} hideNavBar />
              <Scene key="Recipe" component={Recipe} hideNavBar />
              <Scene key="Recipes" component={Recipes} hideNavBar initial/>
            </Stack>
          </Router>
        </Provider>
      </MenuProvider>
    );
  }
}
EStyleSheet.build({
  $primaryColor: '#2196F3',
  $secondaryColor: '#1a78c2',
  $accentColor: '#E3F',
  $textColor: '#000',
  $placeholderColor: '#b8b8b8',
  $disabledColor: '#e9e9e9',
  $backgroundColor: '#fff',
  $google: '#756d6d',
  $facebook: '#3b5998'
});
