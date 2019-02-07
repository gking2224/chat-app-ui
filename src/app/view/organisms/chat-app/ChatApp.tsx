import * as React from 'react';
import { ChatRoom } from '../chat-room/ChatRoom';
import { Lobby } from '../lobby/Lobby';

export const ChatApp = () => {

  const [room, setRoom] = React.useState<string>(null);
  const [author, setAuthor] = React.useState<string>(null);
  const leaveRoom = () => setRoom(null);
  const joinRoom = (room: string, author: string) => {
    setRoom(room);
    setAuthor(author);
  }
  return (
    <div>
      {room !== null && <ChatRoom room={room} author={author} onLeave={leaveRoom} />}
      {room === null && <Lobby onJoinRoom={joinRoom} />}
    </div >
  );
}
