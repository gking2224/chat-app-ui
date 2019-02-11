import * as React from 'react';
import { ChatRoom } from '../../organisms/chat-room/ChatRoom';
import { Lobby } from '../../organisms/lobby/Lobby';

export const ChatApp = () => {

  const [room, setRoom] = React.useState<string | null>(null);
  const [author, setAuthor] = React.useState<string | null>(null);
  const leaveRoom = () => setRoom(null);
  const joinRoom = (room: string, author: string) => {
    setRoom(room);
    setAuthor(author);
  }
  return (
    <div>
      {room !== null && author !== null && <ChatRoom room={room} author={author} onLeave={leaveRoom} />}
      {room === null && <Lobby onJoinRoom={joinRoom} />}
    </div >
  );
}
