import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import AlertMessage from '../Alert';


const mapStateToProps = ({ modalWindow, channelDeletingState }) => {
  const { channelId, show, type } = modalWindow;

  const props = {
    modalDeleteChannelShow: show && type === 'deleting',
    channelDeletingState,
    channelId,
  };
  return props;
};


export default
@connect(mapStateToProps, actionCreators)
class ModalDeleteChannel extends React.Component {
  closeModal = () => {
    const { closeModalWindow } = this.props;
    closeModalWindow();
  }

  handleDeletingChannel = () => {
    const { channelId, deleteChannel } = this.props;
    return deleteChannel(channelId);
  }

  renderAlert = () => <AlertMessage message="Error while deleting channel" />

  render() {
    const { modalDeleteChannelShow, channelDeletingState } = this.props;
    const failed = channelDeletingState === 'failed';
    return (
      <Modal show={modalDeleteChannelShow} onHide={this.closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deleting channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete channel?
          { failed && this.renderAlert() }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>Cancel</Button>
          <Button variant="danger" onClick={this.handleDeletingChannel}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
