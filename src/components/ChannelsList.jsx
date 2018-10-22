import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';


const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};

export default
@connect(mapStateToProps, actionCreators)
class ChannelsList extends React.Component {
  switchChanell = channelId => () => {
    const { setCurrentChannel } = this.props;
    setCurrentChannel(channelId);
  }

  render() {
    const { channels } = this.props;
    return (
      <ListGroup defaultActiveKey={`#${channels[0].name}`}>
        {channels.map(({ id, name }) => (
          <ListGroup.Item key={id} action href={`#${name}`} onClick={this.switchChanell(id)}>
            {name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
