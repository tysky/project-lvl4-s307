import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import AlertMessage from '../Alert';
import InputChannelName from './InputChannelName';

const mapStateToProps = ({ modalWindow, channelAddingState }) => {
  const { show, type } = modalWindow;
  const props = {
    modalAddChannelShow: show && type === 'adding',
    channelAddingState,
  };
  return props;
};

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

  renderAlert = () => <AlertMessage message="Error while creating channel" />

  render() {
    const {
      handleSubmit, modalAddChannelShow, channelAddingState, pristine, submitting,
    } = this.props;
    const failed = channelAddingState === 'failed';
    return (
      <Modal show={modalAddChannelShow} onHide={this.closeModal} centered>
        <form onSubmit={handleSubmit(this.handleAddingChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Create channel</Modal.Title>
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
            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
            <Button variant="success" type="submit" disabled={pristine || submitting}>Add</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
