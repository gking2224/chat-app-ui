import { Message } from "../model/domain/message";
import { GetMessagesResponse } from "../model/api/messages";

const url = (room: string) => `${process.env.GET_MESSAGES_URL}/?room=${room}`

export const getMessages = async (room: string): Promise<Message[]> => {
  return fetch(url(room))
    .then((response) => (response.json() as any) as GetMessagesResponse)
    .then(m => m.messages);
}
