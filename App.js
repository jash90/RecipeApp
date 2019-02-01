import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from './src/scenes/Home';
import Recipes from './src/scenes/Recipes';
import Recipe from './src/scenes/Recipe';
import Login from './src/scenes/Login';
import Register from './src/scenes/Register';
import Profile from './src/scenes/Profile';
import AddRecipe from './src/scenes/AddRecipe';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      login:"",
      accessToken:"",
      loggin: false
    };
  }
  signin = (id, login, accessToken) =>{
    this.setState({id, login, accessToken, loggin:true})
  }
  logout = ()=>{
    this.setState({ id:0, login:"", accessToken:"", loggin: false })
  }
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Home" component={Home} hideNavBar {...{state: this.state, signin : this.signin, logout: this.logout}}/>
          <Scene key="Recipes" component={Recipes} hideNavBar/>
          <Scene key="Recipe" component={Recipe} hideNavBar/>
          <Scene key="Login" component={Login} hideNavBar/>
          <Scene key="Register" component={Register} hideNavBar/>
          <Scene key="Profile" component={Profile} hideNavBar/>
          <Scene key="AddRecipe" component={AddRecipe} hideNavBar/>
        </Stack>
      </Router>
    );
  }
}