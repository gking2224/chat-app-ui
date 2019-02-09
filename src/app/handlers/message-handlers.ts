
const url = () => process.env.GET_ROOMS_URL;

type GetRoomsResponse = {
  rooms: string[];
}

export const getRooms = async (): Promise<string[]> => {
  return fetch(url())
    .then((response) => (response.json() as any) as GetRoomsResponse)
    .then((response) => response.rooms);
}
