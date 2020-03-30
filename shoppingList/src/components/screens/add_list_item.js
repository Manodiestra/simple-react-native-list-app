import React from 'react';
import {connect} from 'react-redux';
import {addToList} from '../../actions/listActions';
import {Container, Input, Form, Item, Label, Button, Text} from 'native-base';
import {StyleSheet, Alert} from 'react-native';

export class AddListItem extends React.Component {
  state = {
    title: '',
  };

  styles = StyleSheet.create({
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
    this.props.addToList({
      list_id: this.props.route.params.list_id,
      title: this.state.title,
      id: this.state.id,
    });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input onChangeText={text => this.update('title', text)} />
          </Item>
        </Form>
        <Container style={this.styles.saveButtonContainer}>
          <Button onPress={this.save}>
            <Text>Save</Text>
          </Button>
        </Container>
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
  addToList,
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch,
)(AddListItem);
