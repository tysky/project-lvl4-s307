import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import ModalAddChannel from './ModalAddChannel';


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

  switchChannel = channelId => () => {
    const { setCurrentChannel } = this.props;
    setCurrentChannel(channelId);
  }

  render() {
    const { channels } = this.props;
    return (
      <>
        <ListGroup defaultActiveKey={`#${channels[0].name}`}>
          {channels.map(({ id, name }) => (
            <ListGroup.Item key={id} action href={`#${name}`} onClick={this.switchChannel(id)}>
              {name}
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
      </>
    );
  }
}
