import React from 'react';
import ChatContext from '../context';

// eslint-disable-next-line import/prefer-default-export
export const ChannelsList = () => (
  <ChatContext.Consumer>
    {channels => (
      <ul className="list-group">
        {channels.map(({ name }) => <li key={name} className="list-group-item">{name}</li>)}
      </ul>
    )}
  </ChatContext.Consumer>
);
