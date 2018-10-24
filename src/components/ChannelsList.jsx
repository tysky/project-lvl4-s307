import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as actionCreators from '../actions';
import ModalAddChannel from './ModalAddChannel';
import ModalEditChannel from './ModalEditChannel';

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
    const { openModalAddChannel } = this.props;
    openModalAddChannel();
  }

  openModalEditing = channelId => () => {
    const { openModalEditChannel } = this.props;
    openModalEditChannel({ channelId });
  }

  switchChannel = channelId => () => {
    const { setCurrentChannel } = this.props;
    setCurrentChannel(channelId);
  }

  renderEditingIcon = id => <FontAwesomeIcon onClick={this.openModalEditing(id)} className="ml-5" icon={faPencilAlt} />

  render() {
    const { channels } = this.props;
    return (
      <>
        <ListGroup defaultActiveKey={`#${channels[0].name}`}>
          {channels.map(({ id, name, removable }) => (
            <ListGroup.Item key={id} action href={`#${name}`} onClick={this.switchChannel(id)}>
              <span>{name}</span>
              {removable && this.renderEditingIcon(id)}
              {/* <FontAwesomeIcon onClick={this.openModalEditing(id)} className="ml-5" icon={faPencilAlt} /> */}
              {/* <FontAwesomeIcon className="ml-2" icon={faTimes} /> */}
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
      </>
    );
  }
}
