import React from 'react';
import {connect} from 'react-redux';
import {createTodo} from '../../actions/todos';
import {Container, Input, Form, Item, Label, Button, Text} from 'native-base';
import {StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomIcon from '../common/custom_icon';

const originalIconState = {
  'th-list': false,
  envelope: false,
  'shopping-cart': false,
  cutlery: false,
  car: false,
  linux: false,
};

export class CreateListScreen extends React.Component {
  state = {
    title: '',
    titleMissing: false,
    selectedIcon: originalIconState,
    iconMissing: false,
  };

  styles = StyleSheet.create({
    iconWrapper: {
      padding: 8,
      flexDirection: 'row',
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
      Alert.alert('Missing Info', 'You have to provide a title!!');

      this.setState({titleMissing: true});

      return;
    } else if (this.state.selectedIcon == originalIconState) {
      Alert.alert('Missing Info', 'You have to provide a title!!');

      this.setState({iconMissing: true});

      return;
    }
    this.props.createTodo(this.state.title, this.state.selectedIcon);
    this.props.navigation.goBack();
  };

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
        <Container style={[this.styles.iconWrapper]}>
          <TouchableOpacity onPress={console.log}>
            <CustomIcon
              name="th-list"
              selected={this.state.selectedIcon['th-list']}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log}>
            <CustomIcon
              name="envelope"
              selected={this.state.selectedIcon.envelope}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log}>
            <CustomIcon
              name="shopping-cart"
              selected={this.state.selectedIcon['shopping-cart']}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log}>
            <CustomIcon
              name="cutlery"
              selected={this.state.selectedIcon.cutlery}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log}>
            <CustomIcon name="car" selected={this.state.selectedIcon.car} />
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log}>
            <CustomIcon name="linux" selected={this.state.selectedIcon.linux} />
          </TouchableOpacity>
        </Container>
        <Container style={this.styles.saveButtonContainer}>
          <Button onPress={this.save}>
            <Text>Save</Text>
          </Button>
        </Container>
      </Container>
    );
  }
}

const mapPropsToDispatch = {
  createTodo,
};

export default connect(
  null,
  mapPropsToDispatch,
)(CreateListScreen);
