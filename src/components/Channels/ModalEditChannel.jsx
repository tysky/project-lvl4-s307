import React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import AlertMessage from '../Alert';

const mapStateToProps = ({ modalWindow, channelEditingState }) => {
  const { channelId, show, type } = modalWindow;

  const props = {
    modalEditChannelShow: show && type === 'editing',
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
class ModalEditChannel extends React.Component {
  closeModal = () => {
    const { closeModalWindow, reset } = this.props;
    closeModalWindow();
    reset();
  }

  handleEditingChannel = ({ channelName }) => {
    const { channelId, editChannel, reset } = this.props;
    return editChannel({ channelId, channelName }, reset);
  }

  renderAlert = () => <AlertMessage message="Error while editing channel" />

  render() {
    const {
      handleSubmit, modalEditChannelShow, channelEditingState, pristine, submitting,
    } = this.props;
    const failed = channelEditingState === 'failed';
    return (
      <Modal
        show={modalEditChannelShow}
        onHide={this.closeModal}
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
