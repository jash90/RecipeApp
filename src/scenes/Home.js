import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native';
import {Content, Container, Footer} from "native-base";
import {Button, Logo, Head, Input} from "../components";
import {Col, Grid, Row} from "react-native-easy-grid";
import Color from "../Color";

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
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
        this.setState({ingredients: data.data});
      })
  }
  render() {
    return (
      <Container>
        <Head
          text={"Coś na ząb"}
          right
          onPress={() => {
          Actions.Register();
        }}
          icon={"person"}/>
        <Content
          contentContainerStyle={{
          width: "100%",
          height: "100%"
        }}>
          <View style={{
            flex: 8
          }}>
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
          </View>
          <View
            style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "center"
          }}>
            <View
              style={{
              height: 60,
              flex: 1,
              marginHorizontal: 5,
              borderColor: Color.primaryColor,
              borderRadius: 50,
              borderWidth: 2,
              backgroundColor: 'white',
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row"
            }}>
              <TextInput
              style={{paddingHorizontal:10, fontSize:16}}
                placeholder="ingredient"
                value={this.state.ingredient}
                onChangeText={text => this.setState({ingredient: text})}/>
              <TouchableOpacity onPress={() => this.nextScene()}>
                <View style={styles.iconContainer}>
                  <Icon name="search" style={styles.icon}/>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </Content>
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
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1
  },
  textInputContainer: {},
  icon: {
    fontSize: 45,
    color: 'white'
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: Color.primaryColor,
    backgroundColor: Color.primaryColor,
    borderRadius: 360,
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
