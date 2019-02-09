import * as React from 'react';
import useInputBoundState from '../../../hooks/use-input-value';
import { getRooms, createRoom } from '../../../handlers/message-handlers';

interface LobbyProps {
  readonly onJoinRoom: (room: string, author: string) => void;
}
export const Lobby = (props: LobbyProps) => {

  const [room, setRoom] = React.useState<string>('');
  const [rooms, setRooms] = React.useState<string[] | null>(null);
  const [author, setAuthor] = useInputBoundState('')
  const [newRoomName, setNewRoomName] = useInputBoundState('')

  const initRooms = () => {
    getRooms().then(setRooms);
  }

  React.useEffect(initRooms, []);

  const roomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  }

  const onCreateNewRoom = () => {
    createRoom(newRoomName).then(() => {
      initRooms();
      setRoom(newRoomName);
      setNewRoomName('');
    });
  }
  const canCreateRoom = newRoomName !== '' && (rooms !== null && rooms.indexOf(newRoomName) === -1);

  const joinRoom = () => props.onJoinRoom(room, author);
  return (
    <div>
      <h2>Lobby</h2>
      <div>
        <label>
          Room
          {!rooms && <span>Loading Rooms...</span>}
          {!!rooms && (
            <select onChange={roomChange} value={room}>
              {room === '' && <option value={''}>Please select...</option>}
              {rooms.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          )}
        </label>
        <label>
          or create new
          <input value={newRoomName} onChange={setNewRoomName} />
        </label>
        <button type={'button'} disabled={!canCreateRoom} onClick={onCreateNewRoom}>Create</button>
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
