import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
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
      <a href={`#edit-channel-${id}`} role="button" onClick={this.openModalEditing(id)} style={{ marginLeft: 'auto' }}>
        <img src="/assets/images/edit.svg" alt="edit channel name" />
      </a>
      <a href={`#delete-channel-${id}`} role="button" onClick={this.openModalDeleting(id)}>
        <img src="/assets/images/delete.svg" alt="delete channel name" />
      </a>
    </>
  )

  render() {
    const { channels, currentChannelId } = this.props;
    const channelStyle = { display: 'flex' };
    const currentChannelDivStyle = { display: 'flex', backgroundColor: '#17a2b8' };
    const currentChannelLinkStyle = { color: 'white', fontWeight: 'bold' };
    return (
      <>
        <ListGroup>
          {channels.map(({ id, name, removable }) => (
            <ListGroup.Item key={id} style={currentChannelId === id ? currentChannelDivStyle : channelStyle}>
              <a
                onClick={this.switchChannel(id)}
                href={`#${name}`}
                style={currentChannelId === id ? currentChannelLinkStyle : null}
              >
                {name}
              </a>
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
