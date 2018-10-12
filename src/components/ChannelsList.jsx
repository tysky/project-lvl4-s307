import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function ChannelsList({ channels }) {
  return (
    <ListGroup>
      {channels.map(({ name }) => <ListGroup.Item key={name}>{name}</ListGroup.Item>)}
    </ListGroup>
  );
}
