import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import ChatContext from '../context';

// eslint-disable-next-line import/prefer-default-export
export const ChannelsList = () => (
  <ChatContext.Consumer>
    {channels => (
      <Col sm={3}>
        <ListGroup>
          {channels.map(({ name }) => <ListGroup.Item key={name}>{name}</ListGroup.Item>)}
        </ListGroup>
      </Col>
    )}
  </ChatContext.Consumer>
);
