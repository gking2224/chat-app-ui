import { Message } from "../model/domain/message";
import { GetMessagesResponse } from "../model/api/messages";
import { join } from "path";

export const getMessages = async (): Promise<Message[]> => {
  return fetch(process.env.GET_MESSAGES_URL)
    .then((response) => (response.json() as any) as GetMessagesResponse)
    .then(m => m.messages);
}
