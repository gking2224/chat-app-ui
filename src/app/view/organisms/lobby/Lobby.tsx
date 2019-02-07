import * as React from 'react';
import useInputBoundState from '../../../hooks/use-input-value';

interface LobbyProps {
  readonly onJoinRoom: (room: string, author: string) => void;
}
export const Lobby = (props: LobbyProps) => {

  const [room, setRoom] = useInputBoundState('');
  const [author, setAuthor] = useInputBoundState('');

  const joinRoom = () => props.onJoinRoom(room, author);
  return (
    <div>
      <h2>Lobby</h2>
      <div>
        <label>
          Room
        <input onChange={setRoom} value={room} />
        </label>
      </div>
      <div>
        <label>
          Username
        <input onChange={setAuthor} value={author} />
        </label>
      </div>
      <button onClick={joinRoom} type={'button'}>Join Room</button>
    </div>
  );
};
