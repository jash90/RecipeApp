import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  StatusBar
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title
} from 'native-base';

import _ from 'lodash';
import api from "../api";
import axios from "axios";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      ingredient: '',
      searchings: []
    };
  }
  componentDidMount() {
    api
      .ingredients()
      .then(data => {
        this.setState({ingredients:data.data});
      })
  }
  render() {
    return (
      <Container>
        <Header // androidStatusBarColor="pink"
        >
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {Actions.Login();}}>
              <Icon name="person" size={30} color="white"/>
            </Button>
          </Right>
        </Header>
        <View style={styles.container}>
          <FlatList
            scrollEventThrottle={1900}
            extraData={this.state.searchings}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            data={this.state.ingredients}
            contentContainerStyle={{
            width: '100%',
            flexWrap: 'wrap'
          }}
            renderItem={({item}) => this.renderTag(item)}/>
          <View style={styles.searchContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="ingredient"
                value={this.state.ingredient}
                onChangeText={text => this.setState({ingredient: text})}/>
            </View>
            <TouchableOpacity onPress={() => this.nextScene()}>
              <View style={styles.iconContainer}>
                <Icon name="search" style={styles.icon}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }

  renderTag(item) {
    const index = _.indexOf(this.state.searchings, item);
    let styleTag = styles.selectedTag;
    if (index < 0) {
      styleTag = styles.tag;
    }
    return (
      <TouchableOpacity onPress={() => this.toggleIngredient(item)}>
        <View style={styleTag}>
          <Text style={{
            fontSize: 18
          }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  add() {
    this.setState({
      variable: this.state.variable + 1
    });
  }

  remove() {
    this.setState({
      variable: this.state.variable - 1
    });
  }

  nextScene() {
    Actions.Recipes({ingredients: this.state.searchings});
  }

  toggleIngredient(ingredient) {
    const index = _.indexOf(this.state.searchings, ingredient);
    console.log(ingredient);
    // console.log(index);
    if (index > -1) {
      const array = this.state.searchings;
      array.splice(index, 1);
      this.setState({searchings: array});
    } else {
      const array = this.state.searchings;
      array.push(ingredient);
      console.log(array);
      this.setState({searchings: array});
      //console.log(array);
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  textInputContainer: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'white'
  },
  icon: {
    fontSize: 40,
    color: 'red'
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  tag: {
    justifyContent: 'center',
    padding: 7,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(22,34,55)',
    backgroundColor: 'white'
  },
  selectedTag: {
    justifyContent: 'center',
    padding: 7,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(22,34,55)',
    backgroundColor: 'red'
  }
});
