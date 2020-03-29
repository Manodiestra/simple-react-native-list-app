import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomIcon extends React.Component {
  styles = StyleSheet.create({
    default: {
      padding: 16,
    },
    iconSelected: {
      backgroundColor: 'red',
    },
  });

  render() {
    if (this.props.selected) {
      return (
        <Icon
          style={[this.styles.default, this.styles.iconSelected]}
          name={this.props.name}
          size={32}
          color="black"
        />
      );
    } else {
      return (
        <Icon
          style={[this.styles.default]}
          name={this.props.name}
          size={32}
          color="black"
        />
      );
    }
  }
}
