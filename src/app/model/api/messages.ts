import { Message } from "../domain/message";

export interface GetMessagesResponse {
  readonly messages: Message[];
}
