import React from 'react';
import ChannelsList from './ChannelsList';
import NewMessageForm from './NewMessageForm';
import MessagesList from './MessagesList';


export default function ChatApp() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-4 col-md-3">
          <ChannelsList />
        </div>
        <div className="col align-self-end col-sm-8 col-md-9">
          <MessagesList />
          <NewMessageForm />
        </div>
      </div>
    </React.Fragment>
  );
}
