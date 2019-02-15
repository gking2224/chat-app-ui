import './lobby.css';

import * as React from 'react';
import { createRoom, getRooms } from '../../../handlers/message-handlers';
import useInputBoundState from '../../../hooks/use-input-value';
import CreateNewRoom from '../../molecules/create-new-room/CreateNewRoom';
import SelectRoom from '../../molecules/select-room/SelectRoom';

interface LobbyProps {
  readonly onJoinRoom: (room: string, author: string) => void;
}
export const Lobby = (props: LobbyProps) => {
  const [selectedRoom, setRoom] = React.useState<string>('');
  const [allRooms, setRooms] = React.useState<ReadonlyArray<string> | null>(null);
  const [author, setAuthor] = useInputBoundState('');

  const initRooms = () => {
    getRooms().then(setRooms);
  };
  React.useEffect(initRooms, []);

  const onCreateNewRoom = async (newRoomName: string) => {
    return createRoom(newRoomName).then(() => {
      initRooms();
      setRoom(newRoomName);
    });
  };

  const roomExists = (room: string) => (allRooms !== null && allRooms.indexOf(room) !== -1);
  const canCreateRoom = (room: string) => room !== '' && !roomExists(room);

  const canJoin = author !== '' && selectedRoom !== '';
  const joinRoom = () => props.onJoinRoom(selectedRoom, author);

  return (
    <div className={'lobby-ctr'}>
      <div className={'lobby'}>
        <h2>Lobby</h2>
        <div>
          <SelectRoom rooms={allRooms} selectedRoom={selectedRoom} onChange={setRoom} />
          <CreateNewRoom onCreateNewRoom={onCreateNewRoom} canCreateRoom={canCreateRoom} />
        </div>
        <div>
          <label>
            Username
          <input onChange={setAuthor} value={author} />
          </label>
        </div>
        <button onClick={joinRoom} disabled={!canJoin} type={'button'}>Join Room</button>
      </div>
    </div>
  );
};
