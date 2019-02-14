import { Array, Record, String, Literal, Static } from 'runtypes';
declare const _ConnectionId: String;
export declare type ConnectionId = Static<typeof _ConnectionId>;
export declare const validateConnectionId: (c: any) => string;
declare const _ConnectionEntity: Record<{
    room: String;
    author: String;
    connectionId: String;
}>;
export declare type ConnectionEntity = Static<typeof _ConnectionEntity>;
export declare const validateConnectionEntity: (c: any) => {
    room: string;
    author: string;
    connectionId: string;
};
declare const _RoomEntity: Record<{
    room: String;
}>;
export declare type RoomEntity = Static<typeof _RoomEntity>;
export declare const validateRoomEntity: (r: any) => {
    room: string;
};
declare const _BaseChatRoomMessage: Record<{
    message: String;
    room: String;
    author: String;
}>;
export declare type BaseChatRoomMessage = Static<typeof _BaseChatRoomMessage>;
declare const _ChatRoomMessageEntity: import("runtypes").Intersect2<Record<{
    message: String;
    room: String;
    author: String;
}>, Record<{
    messageId: String;
    translation: import("runtypes").Union2<import("runtypes").Union2<String, Literal<null>>, Literal<undefined>>;
    language: String;
}>>;
export declare type ChatRoomMessageEntity = Static<typeof _ChatRoomMessageEntity>;
export declare const validateChatRoomMessageEntity: (m: any) => {
    message: string;
    room: string;
    author: string;
} & {
    messageId: string;
    translation: string;
    language: string;
};
declare const _NotifyNewMessage: Record<{
    action: Literal<"message">;
    message: import("runtypes").Intersect2<Record<{
        message: String;
        room: String;
        author: String;
    }>, Record<{
        messageId: String;
        translation: import("runtypes").Union2<import("runtypes").Union2<String, Literal<null>>, Literal<undefined>>;
        language: String;
    }>>;
}>;
export declare type NotifyNewMessage = Static<typeof _NotifyNewMessage>;
declare const _InitRoomResponse: Record<{
    action: Literal<"init">;
    messages: Array<import("runtypes").Intersect2<Record<{
        message: String;
        room: String;
        author: String;
    }>, Record<{
        messageId: String;
        translation: import("runtypes").Union2<import("runtypes").Union2<String, Literal<null>>, Literal<undefined>>;
        language: String;
    }>>>;
}>;
export declare type InitRoomResponse = Static<typeof _InitRoomResponse>;
declare const _WebsocketMessageResponse: import("runtypes").Union2<Record<{
    action: Literal<"init">;
    messages: Array<import("runtypes").Intersect2<Record<{
        message: String;
        room: String;
        author: String;
    }>, Record<{
        messageId: String;
        translation: import("runtypes").Union2<import("runtypes").Union2<String, Literal<null>>, Literal<undefined>>;
        language: String;
    }>>>;
}>, Record<{
    action: Literal<"message">;
    message: import("runtypes").Intersect2<Record<{
        message: String;
        room: String;
        author: String;
    }>, Record<{
        messageId: String;
        translation: import("runtypes").Union2<import("runtypes").Union2<String, Literal<null>>, Literal<undefined>>;
        language: String;
    }>>;
}>>;
export declare type WebsocketMessageResponse = Static<typeof _WebsocketMessageResponse>;
declare const _IncomingNewMessage: Record<{
    message: String;
    room: String;
    author: String;
}>;
export declare type IncomingNewMessage = Static<typeof _IncomingNewMessage>;
declare const _RequestInitRoom: Record<{
    action: Literal<"init">;
    roomName: String;
}>;
export declare type RequestInitRoom = Static<typeof _RequestInitRoom>;
declare const _PublishNewMessage: Record<{
    action: Literal<"message">;
    message: Record<{
        message: String;
        room: String;
        author: String;
    }>;
}>;
export declare type PublishNewMessage = Static<typeof _PublishNewMessage>;
declare const _WebsocketMessageRequest: import("runtypes").Union2<Record<{
    action: Literal<"message">;
    message: Record<{
        message: String;
        room: String;
        author: String;
    }>;
}>, Record<{
    action: Literal<"init">;
    roomName: String;
}>>;
export declare type WebsocketMessageRequest = Static<typeof _WebsocketMessageRequest>;
export declare const validateWebsocketMessageRequestBody: (body: any) => {
    action: "init";
    roomName: string;
} | {
    action: "message";
    message: {
        message: string;
        room: string;
        author: string;
    };
};
declare const _CreateRoomBody: Record<{
    roomName: String;
}>;
export declare type CreateRoomBody = Static<typeof _CreateRoomBody>;
export declare const validateCreateRoomBody: (body: any) => {
    roomName: string;
};
export declare type CreateRoomResponse = Static<typeof _CreateRoomBody>;
export declare const validateCreateRoomResponse: (body: any) => {
    roomName: string;
};
declare const _WebsocketEventType: import("runtypes").Union3<Literal<"CONNECT">, Literal<"DISCONNECT">, Literal<"MESSAGE">>;
export declare type WebsocketEventType = Static<typeof _WebsocketEventType>;
export declare const validateWebsocketEventType: (eventType: any) => "CONNECT" | "DISCONNECT" | "MESSAGE";
declare const _WebsocketConnectQueryParameters: Record<{
    room: String;
    author: String;
}>;
export declare type WebsocketConnectQueryParameters = Static<typeof _WebsocketConnectQueryParameters>;
export declare const validateWebsocketConnectQueryParameters: (qsp: any) => {
    room: string;
    author: string;
};
declare const _GetRoomsResponse: Record<{
    rooms: Array<String>;
}>;
export declare type GetRoomsResponse = Static<typeof _GetRoomsResponse>;
export declare const validateGetRoomsResponse: (b: any) => {
    rooms: string[];
};
export {};
