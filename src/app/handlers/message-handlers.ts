import {
  CreateRoomBody, CreateRoomResponse, validateCreateRoomResponse, validateGetRoomsResponse
} from '@animando/chat-types';

const defaultUrl = '<unknown>';

const x: ReadonlyArray<string> = ['a', 'b'];
const getRoomsUrl = () => process.env.GET_ROOMS_URL || defaultUrl;
const createRoomUrl = () => process.env.CREATE_ROOM_URL || defaultUrl;

export const getRooms = async (): Promise<ReadonlyArray<string>> => {
  return fetch(getRoomsUrl())
    .then((response) => response.json())
    .then((obj) => validateGetRoomsResponse(obj))
    .then((getRoomsResponse) => getRoomsResponse.rooms);
};
export const createRoom = async (room: string): Promise<CreateRoomResponse> => {
  const req: CreateRoomBody = {
    roomName: room,
  };
  const options: RequestInit = {
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };
  return fetch(createRoomUrl(), options)
    .then((response) => response.json())
    .then((obj) => validateCreateRoomResponse(obj));
};
