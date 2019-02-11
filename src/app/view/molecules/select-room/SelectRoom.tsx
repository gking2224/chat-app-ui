import * as React from 'react';

interface SelectRoomProps {
  readonly rooms: string[] | null;
  readonly onChange: (room: string) => void;
  readonly selectedRoom: string;
}
export default (props: SelectRoomProps) => {


  const roomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  }
  return (

    <label>
      Room
      {!props.rooms && <span>Loading Rooms...</span>}
      {!!props.rooms && (
        <select onChange={roomChange} value={props.selectedRoom}>
          {props.selectedRoom === '' && <option value={''}>Please select...</option>}
          {props.rooms.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      )}
    </label>
  );
}
