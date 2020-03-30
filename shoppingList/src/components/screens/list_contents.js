import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Container, Button} from 'native-base';
import {SwipeRow} from 'react-native-swipe-list-view';
import {getLists, deleteItem} from '../../actions/listActions';

export class ShoppingListContents extends React.Component {
  state = {
    currentList: null,
  };
  styles = StyleSheet.create({
    base: {
      backgroundColor: 'white',
      height: 64,
      borderBottomWidth: 1,
    },
    deleteButton: {
      flex: 1,
      backgroundColor: 'red',
      height: 64,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 16,
    },
    addButton: {
      backgroundColor: 'blue',
      height: 64,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 16,
    },
    whiteText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    hidden: {
      flexDirection: 'row',
    },
    visible: {
      justifyContent: 'center',
      paddingLeft: 16,
    },
    defaultFont: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
  loadItems(id) {
    for (let list in this.props.lists) {
      if (this.props.lists[list].id == id) {
        this.setState({
          currentList: this.props.lists[list],
        });
      }
    }
  }
  componentDidMount() {
    this.props.getLists();
    this.loadItems(this.props.route.params.id);
  }
  render() {
    if (this.state.currentList === null) {
      return (
        <View>
          <Text>LOADING</Text>
        </View>
      );
    } else {
      const items = this.state.currentList.items;
      console.log('ITEMS FOR LIST', items);
      return (
        <Container>
          <FlatList
            data={items}
            renderItem={({item}) => {
              return (
                <SwipeRow
                  rightOpenValue={-0}
                  leftOpenValue={125}
                  stopRightSwipe={-1}
                  stopLeftSwipe={145}>
                  <View style={[this.styles.base, this.styles.hidden]}>
                    {/* HIDDEN: need to swipe to see this content */}
                    <TouchableOpacity
                      onPress={() => {
                        console.log('need to delete this item');
                        this.props.deleteItem({
                          item_id: item.id,
                          list_id: this.props.route.params.id,
                        });
                      }}
                      style={this.styles.deleteButton}>
                      <Text style={this.styles.whiteText}>DELETE</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[this.styles.base, this.styles.visible]}>
                    {/* VISIBLE: visible by default */}
                    <Text>{item.title}</Text>
                  </View>
                </SwipeRow>
              );
            }}
            keyExtractor={item => `item_${item.id}`}
          />
          <Button
            style={this.styles.addButton}
            onPress={() =>
              this.props.navigation.navigate('Add Contents', {
                list_id: this.props.route.params.id,
              })
            }>
            <Text style={this.styles.defaultFont}>Add Item</Text>
          </Button>
        </Container>
      );
    }
  }
}

const mapStateToProps = storeState => {
  return {
    lists: storeState.lists,
  };
};

const mapPropsToDispatch = {
  getLists,
  deleteItem,
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch,
)(ShoppingListContents);
