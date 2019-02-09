import { NewChatMessage } from "../domain/message";

export interface GetMessagesResponse {
  readonly messages: NewChatMessage[];
}
