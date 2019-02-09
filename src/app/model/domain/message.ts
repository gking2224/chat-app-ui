
export type NewChatMessage = {
  message: string;
  author: string;
  room: string;
  translation?: string;
  language?: string;
}

export interface SavedChatMessage extends NewChatMessage {
  messageId: string;
}

export type InitMessage = {
  action: 'init';
  room: string;
}
export type InitRoomMessages = {
  action: 'init';
  messages: SavedChatMessage[];
}
export type SendNewMessage = {
  action: 'message';
  message: NewChatMessage;
}
export type ReceiveNewMessage = {
  action: 'message';
  message: SavedChatMessage;
}
export type SendMessage = InitMessage | SendNewMessage;
export type ReceiveMessage = ReceiveNewMessage | InitRoomMessages;
