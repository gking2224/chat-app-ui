import {
  validateWebsocketMessageResponse,
  WebsocketMessageRequest,
  WebsocketMessageResponse
} from '@animando/chat-types';
import * as React from 'react';
import withLogger, { LoggerProps } from '../../../hoc/withLogger';
import { WebsocketContext } from '../../../hoc/withWebSocket';
import useMessages from '../../../hooks/use-messages';
import useWebsocket from '../../../hooks/use-websocket';

import { ChatRoomComponent } from './ChatRoom';

export interface ChatRoomOwnProps {
  readonly room: string;
  readonly author: string;
  readonly onLeave: () => void;
}

const ChatRoomInner = (props: ChatRoomOwnProps & LoggerProps) => {

  const [messages, addMessage] = useMessages();

  const onMessageReceived = (m: WebsocketMessageResponse) => addMessage(m);
  const onConnect = () => sendMessage({ action: 'init', roomName: props.room });

  const [connection, connectionStatus, disconnect, sendMessage] =
    useWebsocket<WebsocketMessageRequest, WebsocketMessageResponse>(
      props.room, props.author, onMessageReceived, props.onLeave, onConnect, validateWebsocketMessageResponse);

  const onAddNewMessage = (message: string) => {
    sendMessage({ action: 'message', message: { message, author: props.author, room: props.room } });
  };

  return (
    <WebsocketContext.Provider value={connection}>
      <ChatRoomComponent
        connectionStatus={connectionStatus}
        onDisconnect={disconnect}
        messages={messages}
        onAddNewMessage={onAddNewMessage}
        {...props}
      />
    </WebsocketContext.Provider>
  );
};
export const ChatRoom = withLogger(ChatRoomInner);
