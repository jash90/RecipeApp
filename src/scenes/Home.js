import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';
import {Content, Container} from "native-base";
import {Head} from "../components";
import Color from "../Color";

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import api from "../api";
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
        this.setState({ingredients: data.data.data});
      })
  }
  render() {
    return (
      <Container>
        <Head text={"Coś na ząb"}/>
        <Content contentContainerStyle={styles.content}>
          <ScrollView style={styles.contenerList}>
            <FlatList
              scrollEventThrottle={1900}
              extraData={this.state.searchings}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              data={this
              .state
              .ingredients
              .filter((ingredient) => this.filterIngredients(ingredient))}
              contentContainerStyle={styles.list}
              renderItem={({item}) => this.renderTag(item)}/>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.search}
                placeholder="filtruj składniki"
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
  filterIngredients(ingredient) {
    if (this.state.ingredient) {
      return String(ingredient.name)
        .toLowerCase()
        .includes(this.state.ingredient.toLowerCase());
    }
    return true;
  }
  renderTag(item) {
    const index = _.indexOf(this.state.searchings, item);
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

  nextScene() {
    Actions.Recipes({ingredients: this.state.searchings});
  }

  toggleIngredient(ingredient) {
    const index = _.indexOf(this.state.searchings, ingredient);
    if (index > -1) {
      const array = this.state.searchings;
      array.splice(index, 1);
      this.setState({searchings: array});
    } else {
      const array = this.state.searchings;
      array.push(ingredient);
      this.setState({searchings: array});
    }
  }
}

const styles = StyleSheet.create({
  contenerList: {
    flex: 8
  },
  content: {
    width: "100%",
    height: "100%"
  },
  list: {
    width: "100%",
    flexWrap: 'wrap'
  },
  footer: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "center"
  },
  searchContainer: {
    height: 60,
    width:"100%",
    marginHorizontal: 5,
    borderColor: Color.primaryColor,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  search: {
    width:"80%",
    paddingHorizontal: 10,
    fontSize: 16
  },
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
