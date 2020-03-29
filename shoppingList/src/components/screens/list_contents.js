import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Container, Button} from 'native-base';
import {SwipeRow} from 'react-native-swipe-list-view';
import {getLists} from '../../actions/listActions';

export class ShoppingListContents extends React.Component {
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
  getListItem(item) {
    return (
      <SwipeRow
        rightOpenValue={-125}
        leftOpenValue={125}
        stopRightSwipe={-145}
        stopLeftSwipe={145}>
        <View style={[this.styles.base, this.styles.hidden]}>
          {/* HIDDEN: need to swipe to see this content */}
          <TouchableOpacity
            onPress={() => {
              this.props.deleteList(item.id);
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
  }
  render() {
    console.log('in list contents', this.props)
    const {items} = this.props.route.params.items;
    console.log(this.props);
    return (
      <Container>
        <FlatList
          data={this.props.items}
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={item => `item_${item.id}`}
        />
        <Button
          style={this.styles.addButton}
          onPress={() => this.props.navigation.navigate('Add Contents')}>
          <Text style={this.styles.defaultFont}>Add Item</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    lists: storeState.lists,
  };
};

const mapPropsToDispatch = {
  getLists,
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch,
)(ShoppingListContents);