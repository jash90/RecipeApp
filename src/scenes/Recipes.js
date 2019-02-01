import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  AsyncStorage
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
export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variable: 1,
      recipes: []
    };
  }
  componentDidMount() {
    const ingredients = this
      .props
      .ingredients
      .map(element => {
        return element.id;
      });
    api
      .getByIngredients(ingredients)
      .then(data => {
        console.log(data.data);
        this.setState({recipes: data.data.recipes});
      });
  }
  renderRenderIngredient(item) {
    const styleTag = _.find(this.props.ingredients, {id: item.id})
      ? styles.selectedTag
      : styles.tag;
    return (
      <View style={styleTag}>
        <Text style={{
          color: Color.primaryColor
        }}>{item.name}</Text>
      </View>
    );
  }

  renderRenderRecipe(item) {
    return (
      <TouchableOpacity onPress={()=>Actions.Recipe({recipe:item})}>
        <View
          style={{
          flex: 1,
          borderColor: Color.primaryColor,
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
          margin: 5
        }}>
          <Text
            style={{
            fontWeight: "bold",
            fontSize: 22
          }}>{item.name}</Text>
          <Text
            style={{
            fontWeight: "bold",
            fontSize: 16
          }}>{String(item.content).substring(0, 50) + "..."}</Text>
          <FlatList
            horizontal
            contentContainerStyle={{
            width: '100%',
            flexWrap: 'wrap'
          }}
            data={_.take(item.ingredients, 5)}
            renderItem={({item}) => this.renderRenderIngredient(item)}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Head text={"Coś na ząb"}/>
        <Content
          contentContainerStyle={{
          width: "100%",
          height: "100%"
        }}>
          <View
            style={{
            alignItems: "flex-start",
            justifyContent: "flex-start"
          }}>

            <FlatList
              horizontal
              scrollEventThrottle={1900}
              data={this.props.ingredients}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
              width: '100%',
              flexWrap: 'wrap'
            }}
              renderItem={({item}) => this.renderTag(item)}/>
            <FlatList
              data={this.state.recipes}
              contentContainerStyle={{
              width: "100%"
            }}
              renderItem={({item}) => this.renderRenderRecipe(item)}/>
          </View>
          {/* <View style={{position:"absolute", bottom:20, right:20, width:50, height:50, backgroundColor:"red"}}>

          </View> */}
        </Content>
      </Container>
    );
  }
  renderTag(item) {
    const index = _.indexOf(this.props.ingredients, item);
    let styleTag = styles.selectedTag;
    let color = "white";
    if (index < 0) {
      styleTag = styles.tag;
      color = Color.primaryColor;
    }
    return (
      <TouchableOpacity onPress={() => this.toggleIngredient(item)}>
        <View style={styleTag}>
          <Text style={{
            fontSize: 18,
            color
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
    borderColor: Color.primaryColor,
    backgroundColor: 'white'
  },
  selectedTag: {
    justifyContent: 'center',
    padding: 7,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.primaryColor,
    backgroundColor: Color.primaryColor
  }
});
