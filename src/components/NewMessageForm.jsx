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
      disabled={disabled}
    />
    <InputGroup.Append>
      <Button variant="success" type="submit" disabled={disabled}>Send</Button>
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

  renderAlert = () => (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Error while sending message. Try again please</p>
    </Alert>
  );

  render() {
    const { handleSubmit, messageSendingState } = this.props;
    const disabled = messageSendingState === 'requested';
    const failed = messageSendingState === 'failed';
    return (
      <div className="mt-3">
        { failed ? this.renderAlert() : null }
        <Form onSubmit={handleSubmit(this.handleAddingMessage)}>
          <Form.Group controlId="inputMessageForm">
            <Field name="text" required component={InputMessage} type="text" disabled={disabled} />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
