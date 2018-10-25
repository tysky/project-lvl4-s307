import React from 'react';
import ChannelsList from './Channels/ChannelsList';
import NewMessageForm from './Messages/NewMessageForm';
import MessagesList from './Messages/MessagesList';
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
        <ChatContext.Consumer>
          {context => (
            <div className="col align-self-end col-sm-8 col-md-9">
              <MessagesList />
              <NewMessageForm userName={context.userName} />
            </div>
          )}
        </ChatContext.Consumer>
      </div>
    </React.Fragment>
  );
}
