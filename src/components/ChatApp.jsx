import React from 'react';
import ChannelsList from './ChannelsList';
import NewMessageForm from './NewMessageForm';
import MessagesList from './MessagesList';
import ChatContext from '../context';


export default function ChatApp() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-4 col-md-3">
          <ChatContext.Consumer>
            {context => (
              <ChannelsList channels={context.channels} />
            )}
          </ChatContext.Consumer>
        </div>
        <div className="col align-self-end col-sm-8 col-md-9">
          <MessagesList />
          <ChatContext.Consumer>
            {context => (
              <NewMessageForm userName={context.userName} />
            )}
          </ChatContext.Consumer>
        </div>
      </div>
    </React.Fragment>
  );
}
