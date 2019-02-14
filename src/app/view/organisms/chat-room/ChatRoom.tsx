import { ChatRoomMessageEntity } from '@animando/chat-types';
import * as React from 'react';
import { ChatRoomOwnProps } from '.';
import { LoggerProps } from '../../../hoc/withLogger';
import { useEnterExitLogging } from '../../../hooks/use-enter-exit-logging';
import { ConnectionStatus } from '../../../hooks/use-websocket';
import Messages from '../messages/Messages';

interface ChatRoomProps {
  readonly connectionStatus: ConnectionStatus;
  readonly messages: ReadonlyArray<ChatRoomMessageEntity>;
  readonly onDisconnect: () => void;
  readonly onAddNewMessage: (message: string) => void;
}

type AllProps = ChatRoomProps & ChatRoomOwnProps & LoggerProps;

export const ChatRoomComponent = (props: AllProps) => {
  useEnterExitLogging(
    props.logger,
    `${props.author} entering chat-room ${props.room}`,
    `${props.author} exiting chat-room ${props.room}`);
  return (
    <div>
      <p>Connection Status: {props.connectionStatus}</p>
      <Messages
        messages={props.messages}
        room={props.room}
        author={props.author}
        onAddNewMessage={props.onAddNewMessage}
      />
      <button type={'button'} onClick={props.onDisconnect}>Leave room</button>
    </div>
  );
};
