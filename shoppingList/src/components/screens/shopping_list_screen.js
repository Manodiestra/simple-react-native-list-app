import React from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Text, H1} from 'native-base';
import {FlatList, StyleSheet} from 'react-native';
import ShoppingListItem from '../lists/shopping_list';
import {getLists} from '../../actions/listActions';

export class ShoppingListScreen extends React.Component {
  styles = StyleSheet.create({
    message: {
      alignItems: 'center',
      padding: 16,
    },
  });

  componentDidMount() {
    this.props.getLists();
  }

  render() {
    console.log(Object.keys(this.props));
    if (this.props.lists.length === 0) {
      return (
        <Container style={this.styles.message}>
          <H1>Shopping Lists</H1>
          <Text>
            You do not have any shopping lists yet, click the "New" button at 
            the top to make a new list.
          </Text>
        </Container>
      );
    }

    return (
      <Container>
        <FlatList
          data={this.props.lists}
          renderItem={({item}) => <ShoppingListItem list={item} />}
          keyExtractor={item => `list_${item.id}`}
        />
      </Container>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    lists: storeState.lists,
  };
};

export default connect(
  mapStateToProps,
  {getLists},
)(ShoppingListScreen);
