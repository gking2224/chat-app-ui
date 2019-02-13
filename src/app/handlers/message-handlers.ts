import { validateGetRoomsResponse, CreateRoomBody, validateCreateRoomResponse, CreateRoomResponse } from 'chat-types';

const defaultUrl = '<unknown>';

const getRoomsUrl = () => process.env.GET_ROOMS_URL || defaultUrl;
const createRoomUrl = () => process.env.CREATE_ROOM_URL || defaultUrl;

export const getRooms = async (): Promise<string[]> => {
  return fetch(getRoomsUrl())
    .then((response) => response.json())
    .then((obj) => validateGetRoomsResponse(obj))
    .then((getRoomsResponse) => getRoomsResponse.rooms);
}
export const createRoom = async (room: string): Promise<CreateRoomResponse> => {
  const req: CreateRoomBody = {
    roomName: room
  }
  const options: RequestInit = {
    body: JSON.stringify(req),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  return fetch(createRoomUrl(), options)
    .then((response) => response.json())
    .then((obj) => validateCreateRoomResponse(obj));
}
