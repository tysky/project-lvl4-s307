import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
export default class MessagesList extends React.Component {
  render() {
    const messagesStyle = {
      minHeight: '450px',
    };
    const { messages, currentChannelId } = this.props;
    const messagesOfCurrentChannel = messages.filter(m => m.channelId === currentChannelId);
    return (
      <div style={messagesStyle} className="border border-dark p-1">
        <ListGroup variant="flush">
          {messagesOfCurrentChannel.map(m => (
            <ListGroup.Item className="px-1 py-0" key={m.id}>
              <b>{`${m.userName}:`}</b>
              <span className="pl-2">{m.messageText}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}
