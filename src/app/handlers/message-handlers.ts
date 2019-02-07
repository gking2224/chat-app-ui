import { Message } from "../model/domain/message";

export const getMessages = async (): Promise<Message[]> => {
  const headers = {};
  const request = {
    url: process.env.GET_MESSAGES_URL,
    method: 'GET',
    headers
  };
  // fetch(request)
  //   .then((response) => {

  //   });
  return Promise.resolve([]);
}
