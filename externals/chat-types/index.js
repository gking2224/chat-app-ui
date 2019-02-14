"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runtypes_1 = require("runtypes");
// -- ConnectionId -- //
var _ConnectionId = runtypes_1.String;
exports.validateConnectionId = function (c) { return _ConnectionId.check(c); };
// -- END ConnectionId -- //
// -- ConnectionEntity -- //
var _ConnectionEntity = runtypes_1.Record({
    room: runtypes_1.String,
    author: runtypes_1.String,
    connectionId: _ConnectionId,
});
exports.validateConnectionEntity = function (c) { return _ConnectionEntity.check(c); };
// -- END ConnectionEntity -- //
// -- RoomEntity -- //
var _RoomEntity = runtypes_1.Record({
    room: runtypes_1.String
});
exports.validateRoomEntity = function (r) { return _RoomEntity.check(r); };
// -- END RoomEntity -- //
// -- BaseChatRoomMessage -- //
var _BaseChatRoomMessage = runtypes_1.Record({
    message: runtypes_1.String,
    room: runtypes_1.String,
    author: runtypes_1.String
});
// -- END BaseChatRoomMessage -- //
// -- ChatRoomMessageEntity -- //
var _ChatRoomMessageEntity = _BaseChatRoomMessage.And(runtypes_1.Record({
    messageId: runtypes_1.String,
    translation: runtypes_1.String.Or(runtypes_1.Null).Or(runtypes_1.Undefined),
    language: runtypes_1.String
}));
exports.validateChatRoomMessageEntity = function (m) { return _ChatRoomMessageEntity.check(m); };
// -- END ChatRoomMessageEntity -- //
// -- WebsocketMessageResponse -- //
var _NotifyNewMessage = runtypes_1.Record({
    action: runtypes_1.Literal('message'),
    message: _ChatRoomMessageEntity
});
var _InitRoomResponse = runtypes_1.Record({
    action: runtypes_1.Literal('init'),
    messages: runtypes_1.Array(_ChatRoomMessageEntity)
});
var _WebsocketMessageResponse = runtypes_1.Union(_InitRoomResponse, _NotifyNewMessage);
// -- END WebsocketMessageResponse -- //
// -- WebsocketMessageRequest -- //
var _IncomingNewMessage = _BaseChatRoomMessage;
var _RequestInitRoom = runtypes_1.Record({
    action: runtypes_1.Literal('init'),
    roomName: runtypes_1.String,
});
var _PublishNewMessage = runtypes_1.Record({
    action: runtypes_1.Literal('message'),
    message: _IncomingNewMessage
});
var _WebsocketMessageRequest = runtypes_1.Union(_PublishNewMessage, _RequestInitRoom);
exports.validateWebsocketMessageRequestBody = function (body) {
    return _WebsocketMessageRequest.check(JSON.parse(body));
};
// -- END WebsocketMessageRequest -- //
// -- CreateRoomBody -- //
var _CreateRoomBody = runtypes_1.Record({
    roomName: runtypes_1.String
});
exports.validateCreateRoomBody = function (body) { return _CreateRoomBody.check(JSON.parse(body)); };
// -- END CreateRoomBody -- //
// -- CreateRoomResponse -- //
var _CreateRoomResponse = runtypes_1.Record({
    roomName: runtypes_1.String
});
exports.validateCreateRoomResponse = function (body) { return _CreateRoomResponse.check(body); };
// -- END CreateRoomBody -- //
// -- WebsocketEventType -- //
var _WebsocketEventType = runtypes_1.Union(runtypes_1.Literal('CONNECT'), runtypes_1.Literal('DISCONNECT'), runtypes_1.Literal('MESSAGE'));
exports.validateWebsocketEventType = function (eventType) { return _WebsocketEventType.check(eventType); };
// -- END WebsocketEventType -- //
// -- WebsocketConnectQueryParameters -- //
var _WebsocketConnectQueryParameters = runtypes_1.Record({
    room: runtypes_1.String,
    author: runtypes_1.String
});
exports.validateWebsocketConnectQueryParameters = function (qsp) { return _WebsocketConnectQueryParameters.check(qsp); };
// -- END WebsocketConnectQueryParameters -- //
// -- GetRoomsResponse -- //
var _GetRoomsResponse = runtypes_1.Record({
    rooms: runtypes_1.Array(runtypes_1.String)
});
exports.validateGetRoomsResponse = function (b) { return _GetRoomsResponse.check(b); };
// -- END GetRoomsResponse -- //
//# sourceMappingURL=index.js.map