import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import AlertMessage from '../Alert';
import InputChannelName from './InputChannelName';

const mapStateToProps = ({ modalWindow, channelEditingState }) => {
  const { channelId, show, type } = modalWindow;

  const props = {
    modalEditChannelShow: show && type === 'editing',
    channelEditingState,
    channelId,
  };
  return props;
};

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
      <Modal show={modalEditChannelShow} onHide={this.closeModal} centered>
        <form onSubmit={handleSubmit(this.handleEditingChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit channel name</Modal.Title>
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
            <Button variant="secondary" onClick={this.closeModal}>Cancel</Button>
            <Button variant="success" type="submit" disabled={pristine || submitting}>Edit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
