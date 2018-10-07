import React from 'react';
import ReactDOM from 'react-dom';

import ChatContext from './context';
import { ChannelsList } from './components/ChannelsList';


export default ({ channels }) => {
  const App = () => (
    <ChatContext.Provider value={channels}>
      <ChannelsList />
    </ChatContext.Provider>
  );
  ReactDOM.render(<App />, document.getElementById('chat'));
};
