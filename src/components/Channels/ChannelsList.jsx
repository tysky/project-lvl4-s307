import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as actionCreators from '../../actions';
import ModalAddChannel from './ModalAddChannel';
import ModalEditChannel from './ModalEditChannel';
import ModalDeleteChannel from './ModalDeleteChannel';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const props = {
    channels,
    currentChannelId,
  };
  return props;
};

export default
@connect(mapStateToProps, actionCreators)
class ChannelsList extends React.Component {
  openModalAdding = () => {
    const { openModalWindow } = this.props;
    openModalWindow({ type: 'adding' });
  }

  openModalEditing = channelId => () => {
    const { openModalWindow } = this.props;
    openModalWindow({ channelId, type: 'editing' });
  }

  openModalDeleting = channelId => () => {
    const { openModalWindow } = this.props;
    openModalWindow({ channelId, type: 'deleting' });
  }

  switchChannel = channelId => () => {
    const { setCurrentChannel } = this.props;
    setCurrentChannel(channelId);
  }

  renderIcons = id => (
    <>
      <FontAwesomeIcon onClick={this.openModalEditing(id)} className="ml-5" icon={faPencilAlt} />
      <FontAwesomeIcon onClick={this.openModalDeleting(id)} className="ml-2" icon={faTimes} />
    </>
  )

  render() {
    const { channels } = this.props;
    return (
      <>
        <ListGroup defaultActiveKey={`#${channels[0].name}`}>
          {channels.map(({ id, name, removable }) => (
            <ListGroup.Item key={id} action href={`#${name}`} onClick={this.switchChannel(id)}>
              <span>{name}</span>
              {removable && this.renderIcons(id)}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          variant="outline-primary"
          className="mt-4"
          onClick={this.openModalAdding}
        >
          Create channel
        </Button>
        <ModalAddChannel />
        <ModalEditChannel />
        <ModalDeleteChannel />
      </>
    );
  }
}
