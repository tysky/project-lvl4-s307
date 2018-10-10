import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ChatContext from '../context';

export default function ChannelsList() {
  return (
    <ChatContext.Consumer>
      {channels => (
        <ListGroup>
          {channels.map(({ name }) => <ListGroup.Item key={name}>{name}</ListGroup.Item>)}
        </ListGroup>
      )}
    </ChatContext.Consumer>
  );
}
