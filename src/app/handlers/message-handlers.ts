
const getRoomsUrl = () => process.env.GET_ROOMS_URL;
const createRoomUrl = () => process.env.CREATE_ROOM_URL;

type GetRoomsResponse = {
  rooms: string[];
}

export const getRooms = async (): Promise<string[]> => {
  return fetch(getRoomsUrl())
    .then((response) => (response.json() as any) as GetRoomsResponse)
    .then((response) => response.rooms);
}
export const createRoom = async (room: string): Promise<string[]> => {
  const options: RequestInit = {
    body: JSON.stringify({ room }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  return fetch(createRoomUrl(), options)
    .then((response) => (response.json() as any) as GetRoomsResponse)
    .then((response) => response.rooms);
}
