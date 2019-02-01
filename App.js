import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from './src/scenes/Home';
import Recipes from './src/scenes/Recipes';
import Recipe from './src/scenes/Recipe';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Home" component={Home} hideNavBar />
          <Scene key="Recipes" component={Recipes} hideNavBar/>
          <Scene key="Recipe" component={Recipe} hideNavBar/>
        </Stack>
      </Router>
    );
  }
}