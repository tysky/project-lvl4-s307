import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form, InputGroup, FormControl, Button, Alert,
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

const InputMessage = ({ input, disabled }) => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Enter message"
      aria-label="Enter message"
      {...input}
      autoComplete="off"
      autoFocus
    />
    <InputGroup.Append>
      <Button variant="success" type="submit" disabled={disabled}>Send</Button>
    </InputGroup.Append>
  </InputGroup>
);

export default
@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'newMessage' })
class NewMessageForm extends React.Component {
  handleAddingMessage = ({ text }) => {
    const {
      addMessage, reset, currentChannelId, userName,
    } = this.props;
    const messageData = { messageText: text, userName, currentChannelId };
    return addMessage(messageData, reset);
  }

  renderAlert = () => (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Error while sending message. Try again please</p>
    </Alert>
  );

  render() {
    const {
      handleSubmit, messageSendingState, pristine, submitting,
    } = this.props;
    const failed = messageSendingState === 'failed';
    return (
      <div className="mt-3">
        { failed && this.renderAlert() }
        <Form onSubmit={handleSubmit(this.handleAddingMessage)}>
          <Form.Group controlId="inputMessageForm">
            <Field
              name="text"
              required
              component={InputMessage}
              type="text"
              disabled={pristine || submitting}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
