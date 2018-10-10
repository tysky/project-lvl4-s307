import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form, InputGroup, FormControl, Button,
} from 'react-bootstrap';


const InputMessage = () => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Enter message"
      aria-label="Input message"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="success" type="submit">Send</Button>
    </InputGroup.Append>
  </InputGroup>
);

class NewMessageForm extends React.Component {
  addMessage = (value) => {
    // this.props.addMessage({ message: value });
    // this.props.reset();
  }

  render() {
    return (
      <div className="mt-3">
        <Form>
          <Form.Group controlId="inputMessageForm">
            <Field name="text" required component={InputMessage} type="text" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
