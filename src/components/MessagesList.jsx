import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ currentChannelId, messages }) => {
  const props = {
    currentChannelId,
    messages,
  };
  return props;
};

@connect(mapStateToProps)
export default class MessagesList extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messagesStyle = {
      height: '450px',
      overflowY: 'auto',
    };
    const { messages, currentChannelId } = this.props;
    const messagesOfCurrentChannel = messages.filter(m => m.channelId === currentChannelId);
    return (
      <div
        style={messagesStyle}
        className="border border-dark p-1"
      >
        <ListGroup variant="flush">
          {messagesOfCurrentChannel.map(m => (
            <ListGroup.Item className="px-1 py-0" key={m.id}>
              <b>{`${m.userName}:`}</b>
              <span className="pl-2">{m.messageText}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div
          ref={(el) => { this.messagesEnd = el; }}
        />
      </div>
    );
  }
}
