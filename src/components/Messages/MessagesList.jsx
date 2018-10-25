import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ currentChannelId, messages }) => {
  const props = {
    messages: messages.filter(m => m.channelId === currentChannelId),
  };
  return props;
};

export default
@connect(mapStateToProps)
class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messagesStyle = {
      height: '450px',
      overflowY: 'auto',
    };
    const { messages } = this.props;
    // const messagesOfCurrentChannel = messages.filter(m => m.channelId === currentChannelId);
    return (
      <div
        style={messagesStyle}
        className="border border-dark p-1"
      >
        <ListGroup variant="flush">
          {messages.map(m => (
            <ListGroup.Item className="px-1 py-0" key={m.id}>
              <b>{`${m.userName}:`}</b>
              <span className="pl-2">{m.messageText}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div
          ref={this.messagesEnd}
        />
      </div>
    );
  }
}
