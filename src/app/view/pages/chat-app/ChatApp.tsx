import * as React from 'react';
import { ChatRoom } from '../../organisms/chat-room';
import { Lobby } from '../../organisms/lobby/Lobby';

export const ChatApp = () => {
  const [room, setRoom] = React.useState<string | null>(null);
  const [author, setAuthor] = React.useState<string | null>(null);
  const leaveRoom = () => setRoom(null);
  const joinRoom = (newRoom: string, newAuthor: string) => {
    setRoom(newRoom);
    setAuthor(newAuthor);
  };
  return (
    <div>
      {room !== null && author !== null && <ChatRoom room={room} author={author} onLeave={leaveRoom} />}
      {room === null && <Lobby onJoinRoom={joinRoom} />}
    </div >
  );
};
