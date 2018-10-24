import React from 'react';
import {
  Alert, Button, FormControl, Modal,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ modalEditChannel, channelEditingState }) => {
  const { channelId, modalEditChannelShow } = modalEditChannel;

  const props = {
    modalEditChannelShow,
    channelEditingState,
    channelId,
  };
  return props;
};

const InputChannelName = ({ input, disabled }) => (
  <FormControl
    placeholder="Enter message"
    aria-label="Enter message"
    {...input}
    autoComplete="off"
    disabled={disabled}
  />
);

export default
@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'newChannel' })
class ModalAddChannell extends React.Component {
  closeModalWindow = () => {
    const { closeModalEditChannel, reset } = this.props;
    closeModalEditChannel();
    reset();
  }

  handleEditingChannel = ({ channelName }) => {
    const { channelId, editChannel, reset } = this.props;
    return editChannel({ channelId, channelName }, reset);
  }

  renderAlert = () => (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Error while editing channel. Try again please</p>
    </Alert>
  );

  render() {
    const {
      handleSubmit, modalEditChannelShow, channelEditingState, pristine, submitting,
    } = this.props;
    const failed = channelEditingState === 'failed';
    return (
      <Modal
        show={modalEditChannelShow}
        onHide={this.closeModalWindow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={handleSubmit(this.handleEditingChannel)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit channel name
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { failed && this.renderAlert() }
            <Field
              name="channelName"
              required
              component={InputChannelName}
              type="text"
              disabled={submitting}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModalWindow}>Close</Button>
            <Button variant="success" type="submit" disabled={pristine || submitting}>Send</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
