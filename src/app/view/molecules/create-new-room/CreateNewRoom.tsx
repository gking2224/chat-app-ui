import * as React from 'react';
import useInputBoundState from '../../../hooks/use-input-value';

interface CreateNewRoomProps {
  readonly onCreateNewRoom: (newRoomName: string) => Promise<void>;
  readonly canCreateRoom: (newRoomName: string) => boolean;
}
export default (props: CreateNewRoomProps) => {

  const [newRoomName, setNewRoomName] = useInputBoundState('');
  const onSubmit = () => {
    props.onCreateNewRoom(newRoomName)
      .then(() => setNewRoomName(''));
  }
  return (
    <>
      <label>
        or create new
        <input value={newRoomName} onChange={setNewRoomName} />
      </label>
      <button type={'button'} disabled={!props.canCreateRoom(newRoomName)} onClick={onSubmit}>Create</button>
    </>
  );
}
