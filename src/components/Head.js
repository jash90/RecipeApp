import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Header, Title, Left, Right, Body, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from "react-native-extended-stylesheet";

export default class Head extends Component {
  render() {
    return (
      <Header
        androidStatusBarColor={EStyleSheet.value('$primaryColor')}
        style={styles.styleHeader}>
        <Left style={styles.fullStyle}>{this.renderLeft()}</Left>
        <Body style={styles.textHeader}>{this.renderContent()}</Body>
        <Right style={styles.fullStyle}>{this.renderRight()}</Right>
      </Header>
    );
  }
  renderLeft() {
    if (this.props.back) {
      return (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Icon name="arrow-back" style={styles.iconLeftHeader} />
        </TouchableOpacity>
      );
    }
    if (this.props.left) {
      return (
        <TouchableOpacity onPress={this.props.leftPress}>
          <Icon name={this.props.leftIcon} style={styles.iconLeftHeader} />
        </TouchableOpacity>
      );
    }
  }
  renderRight() {
    if (this.props.right) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <MaterialIcons
            name={this.props.rightIcon}
            color="white"
            size={30}
            style={styles.iconRightHeader}
          />
        </TouchableOpacity>
      );
    }
  }
  renderContent() {
    if (this.props.content) {
      return this.props.content;
    }
    return <Title style={{ color: '#fff' }}>{this.props.text}</Title>;
  }
}

var styles = EStyleSheet.create({
  styleHeader: { backgroundColor: '$primaryColor' },
  textHeader: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  iconLeftHeader: { color: 'white', paddingLeft: 5 },
  iconRightHeader: { paddingRight: 5 },
  fullStyle: { flex: 1 }
});
