import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ currentChannelId, messageSendingState }) => {
  const props = {
    currentChannelId,
    messageSendingState,
  };
  return props;
};

const InputMessage = field => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Enter message"
      aria-label="Enter message"
      {...field.input}
    />
    <InputGroup.Append>
      <Button variant="success" type="submit">Send</Button>
    </InputGroup.Append>
  </InputGroup>
);

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'newMessage' })
export default class NewMessageForm extends React.Component {
  handleAddingMessage = ({ text }) => {
    const {
      addMessage, reset, currentChannelId, userName,
    } = this.props;
    addMessage({ messageText: text, userName, currentChannelId });
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="mt-3">
        <Form onSubmit={handleSubmit(this.handleAddingMessage)}>
          <Form.Group controlId="inputMessageForm">
            <Field name="text" required component={InputMessage} type="text" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
