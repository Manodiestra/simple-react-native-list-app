import React from 'react';
import {connect} from 'react-redux';
import {createList} from '../../actions/listActions';
import {Container, Input, Form, Item, Label, Button, Text} from 'native-base';
import {StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class AddListItem extends React.Component {
  state = {
    title: '',
  };

  styles = StyleSheet.create({
    iconWrapper: {
      flex: 1,
      padding: 8,
      flexDirection: 'row',
      height: 'auto',
    },
    iconObject: {
      margin: 16,
    },
    saveButtonContainer: {
      padding: 14,
      marginTop: 16,
    },
  });

  update = (key, value) => this.setState({[key]: value});

  save = () => {
    if (this.state.title === '') {
      Alert.alert('Missing Info', 'You have to provide a title');

      this.setState({titleMissing: true});

      return;
    }
    this.props.createList({
      title: this.state.title,
      selectedIcon: this.state.selectedIcon,
      id: this.state.id,
    });
    this.props.navigation.goBack();
  };

  checkIfInModifyMode() {
    if (this.props.route.params) {
      let id = this.props.route.params.id;
      for (let list in this.props.lists) {
        if (this.props.lists[list].id == id) {
          let data = this.props.lists[list];
          this.setState({
            title: data.title,
            selectedIcon: data.selectedIcon,
            id: data.id,
          });
        }
      }
    }
  }

  componentDidMount() {
    this.checkIfInModifyMode();
  }

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input
              value={this.state.title}
              onChangeText={text => this.update('title', text)}
            />
          </Item>
        </Form>
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
  createList,
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch,
)(AddListItem);
