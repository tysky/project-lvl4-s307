import React from 'react';
import {
  Alert, Button, FormControl, Modal,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

const mapStateToProps = ({ modalWindow, channelAddingState }) => {
  const { show, type } = modalWindow;
  const props = {
    modalAddChannelShow: show && type === 'adding',
    channelAddingState,
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
class ModalAddChannel extends React.Component {
  closeModal = () => {
    const { closeModalWindow, reset } = this.props;
    closeModalWindow();
    reset();
  }

  handleAddingChannel = ({ channelName }) => {
    const { addChannel, reset } = this.props;
    return addChannel(channelName, reset);
  }

  renderAlert = () => (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Error while creating channel. Try again please</p>
    </Alert>
  );

  render() {
    const {
      handleSubmit, modalAddChannelShow, channelAddingState, pristine, submitting,
    } = this.props;
    const failed = channelAddingState === 'failed';
    return (
      <Modal
        show={modalAddChannelShow}
        onHide={this.closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={handleSubmit(this.handleAddingChannel)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Create channel
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
