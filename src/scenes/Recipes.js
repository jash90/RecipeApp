import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput
} from 'react-native';
import { Content, Container } from 'native-base';
import { Head } from '../components';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import api from '../api';
export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      refresh: false,
      seletedIngredients: [],
      ingredients: [],
      visibleModal: false,
      search: ''
    };
  }
  componentDidMount() {
    this.getRecipe();
    this.getIngredients();
  }

  getRecipe = () => {
    api.recipes().then(data => {
      this.setState({ recipes: data.data.recipes });
    });
  };

  getIngredients = () => {
    api.ingredients().then(data => {
      this.setState({ seletedIngredients: data.data.data });
    });
  };

  refreshData = () => {
    this.setState({ refresh: true });
    this.getRecipe();
    this.setState({ refresh: false });
  };

  renderIngredient(item) {
    const index = _.find(this.state.seletedIngredients, ['id', item.idIngredient]);
    let styleTag = styles.selectedTag;
    let color = 'white';
    if (index) {
      styleTag = styles.tag;
      color = EStyleSheet.value('$primaryColor');
    }
    return (
      <View style={styleTag}>
        <Text
          style={{
            color: color
          }}>
          {item.name}
        </Text>
      </View>
    );
  }

  renderRecipe(item) {
    return (
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => Actions.Recipe({ recipe: item })}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.content}>
            {`Czas trwania : ${item.preparationTime}min`}
          </Text>
        </TouchableOpacity>
        <FlatList
          horizontal
          contentContainerStyle={styles.ingredientList}
          data={_.take(item.ingredients, 5)}
          renderItem={({ item }) => this.renderIngredient(item)}
          keyExtractor={(item, index) => {
            return String(index);
          }}
        />
      </View>
    );
  }

  renderHeader() {
    const active =
      this.state.seletedIngredients.length > 0 ? 'filter' : 'filter-outline';
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginBottom: 10
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 10
          }}>
          <Text
            style={{
              color: EStyleSheet.value('$primaryColor'),
              fontSize: 22
            }}>
            Składniki :
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ visibleModal: true })}>
            <Icon
              name={active}
              size={30}
              color={EStyleSheet.value('$primaryColor')}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          contentContainerStyle={[styles.tagList]}
          data={_.take(this.state.seletedIngredients, 4)}
          renderItem={({ item }) => this.renderIngredient(item)}
          ListEmptyComponent={() =>
            this.renderIngredient({ name: 'wybierz składniki ...' })
          }
          ListFooterComponent={() => {
            if (this.state.seletedIngredients.length > 4) {
              return this.renderIngredient({ name: '...' });
            }
            return null;
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Head text={'Coś na ząb'} />
        <Content contentContainerStyle={styles.container}>
          <FlatList
            ListHeaderComponent={() => this.renderHeader()}
            refreshing={this.state.refresh}
            onRefresh={() => this.refreshData()}
            data={this.state.recipes}
            renderItem={({ item }) => this.renderRecipe(item)}
            keyExtractor={(item, index) => {
              return String(index);
            }}
          />
        </Content>
        <Modal visible={this.state.visibleModal} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.7)',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
            <View
              style={{
                width: '90%',
                height: '70%',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 5
              }}>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => this.setState({ visibleModal: false })}>
                  <Icon
                    name="arrow-left"
                    size={30}
                    color={EStyleSheet.value('$primaryColor')}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    height: 60,
                    width: '85%',
                    justifyContent: 'center'
                  }}>
                  <TextInput
                    placeholder={'składnik'}
                    style={{ fontSize: 22 }}
                    value={this.state.search}
                    onChangeText={text => this.setState({ search: text })}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: '90%',
                height: 60,
                backgroundColor: EStyleSheet.value('$primaryColor'),
                borderRadius: 20,
                borderWidth: 1,
                borderColor: EStyleSheet.value('$primaryColor'),
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => this.setState({ visibleModal: false })}>
              <Text style={{ color: 'white', fontSize: 22 }}>Filtruj</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Container>
    );
  }

  renderTag(item) {
    const index = _.indexOf(this.state.seletedIngredients, item);
    let styleTag = styles.selectedTag;
    let color = 'white';
    if (index < 0) {
      styleTag = styles.tag;
      color = EStyleSheet.value('$primaryColor');
    }
    return (
      <TouchableOpacity onPress={() => this.toggleIngredient(item)}>
        <View style={styleTag}>
          <Text
            style={{
              fontSize: 18,
              color
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  nextScene() {
    Actions.Recipes({ ingredients: this.state.searchings });
  }

  toggleIngredient(ingredient) {
    const index = _.indexOf(this.state.searchings, ingredient);
    if (index > -1) {
      const array = this.state.searchings;
      array.splice(index, 1);
      this.setState({ searchings: array });
    } else {
      const array = this.state.searchings;
      array.push(ingredient);
      this.setState({ searchings: array });
    }
  }
}

const styles = EStyleSheet.create({
  recipe: {
    flex: 1,
    borderColor: '$primaryColor',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5
  },
  content: {
    fontSize: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  ingredientList: {
    width: '100%',
    flexWrap: 'wrap'
  },
  recipeList: {
    width: '100%'
  },
  tagList: {
    width: '100%',
    flexWrap: 'wrap'
  },
  scrollView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  container: {
    width: '100%',
    height: '100%'
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
    borderColor: '$primaryColor',
    backgroundColor: 'white'
  },
  selectedTag: {
    justifyContent: 'center',
    padding: 7,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '$primaryColor',
    backgroundColor: '$primaryColor'
  }
});
