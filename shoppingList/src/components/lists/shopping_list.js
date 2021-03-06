import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {getLists, deleteList} from '../../actions/listActions';

export class ShoppingListItem extends React.Component {
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
    editButton: {
      flex: 1,
      backgroundColor: 'green',
      height: 64,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: 16,
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
  });
  render() {
    const {list} = this.props;
    return (
      <SwipeRow
        rightOpenValue={-125}
        leftOpenValue={125}
        stopRightSwipe={-145}
        stopLeftSwipe={145}
        onRowPress={() =>
          this.props.navigation.navigate('List Contents', list)
        }>
        <View style={[this.styles.base, this.styles.hidden]}>
          {/* HIDDEN: need to swipe to see this content */}
          <TouchableOpacity
            onPress={() => {
              this.props.deleteList(list.id);
            }}
            style={this.styles.deleteButton}>
            <Text style={this.styles.whiteText}>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Create Shopping List', {list});
            }}
            style={this.styles.editButton}>
            <Text style={this.styles.whiteText}>MODIFY</Text>
          </TouchableOpacity>
        </View>
        <View style={[this.styles.base, this.styles.visible]}>
          {/* VISIBLE: visible by default */}
          <Text>{list.title}</Text>
        </View>
      </SwipeRow>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    lists: storeState.lists,
  };
};

const mapPropsToDispatch = {
  deleteList,
  getLists,
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch,
)(ShoppingListItem);
